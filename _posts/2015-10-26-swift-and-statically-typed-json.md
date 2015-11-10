---
layout: post
title: "Swift and statically typed JSON"
description: ""
category: 
tags: [Swift, JSON]
---
{% include JB/setup %}

After reading [this post about Statically-typed NSUserDefaults](http://radex.io/swift/nsuserdefaults/static/),
I thought about trying to apply it to using JSON. I'm just starting to learn about Swift, so I didn't have much success and there are lots of things I don't understand, but I'm going to tell you what I did anyway.

The main idea here, is that maybe we don't need to transform our JSON dictionaries to a custom struct to get static typing, maybe we can just use the dictionary with statically-typed accessors.

Remember, this is just a thought excersice, there are already lots of ways of handling JSON in Swift.

## The idea

Given a simple JSON like this:

	{
		"s" : "this is a string",
		"i" : 1234
	}

This is what I'm trying to achieve

	struct MyModel:Modelable {
		let dictionary:[String:AnyObject]
	}
	extension Keys where T:MyModel {
		static let string = Key<String>("s")
		static let number = Key<Int>("i")
	}
	let json = MyModel(dictionary: jsonDictionary)
	json[.string] // => "this is a string"

Of course, I'm expecting ".string" to be autocompleted!
Wouldn't that be nice?

## The backend

So, let's try to implement it.
The main difference with the approach for NSUserDefaults is that in this case every Model needs it's own place to store Keys, so we'll use generics to define a Keys class for any T type, and the corresponding Key class extending it trick:

	class Keys<T> {}
	class Key<T, ValueType>: Keys<T> {
		let key: String
		init(key:String) { self.key = key }
	}

Now we teach our structs how to use that keys:

	protocol Modelable {
		var dictionary:[String:AnyObject] { get }
		init (dictionary: [String:AnyObject])
	}
	extension Modelable {
		subscript<T>(key: Key<Self, T>) -> T? {
			return dictionary[key.key] as? T
		}
		// This one could work for nested models
		subscript<T:Modelable>(key: Key<Self, T>) -> T? {
			return T(dictionary: dict)
		}
	}

Cool, right? Now when we subscript our struct, depending on the type info in the Key, it'll know how to treat our value!
… But of course that doesn't work.

## The errors and some workarounds

Sadly, life isn't so easy, there are several problems here.

#### Can't constrain generic type to non-protocol types.
That means ```extension Keys where T:MyModel {``` won't work.
We can teach the protocol how to store info about the implementer's type,
so we can then use a where clause to effectively constrain the generic type to a non-protocol type.

	protocol Modelable {
		typealias SelfType = Self
		var dictionary:[String:AnyObject] { get }
		init (dictionary: [String:AnyObject])
	}
	// Now everytime we want to add some keys:
	extension Keys where T:Modelable, T.SelfType==MyModel {}

#### Static stored properties not yet supported in generic types.
That means ```static let number = Key<Int>("i")``` won't work.
A sad workaround would be to use computed properties. You lose the terseness of type inference.

	// Not so short and nice anymore, but it works
	static var number: Key<T, Int> { return Key<T, Int>(key: "i") }


#### Subscripts don't support generic types (yet?).
That means ```subscript<T>(key: Key<Self, T>) -> T?``` won't work.
I can see two possible ways to deal with this, either we define all the possible cases of subscripts' arguments, which means everytime we create a model that can be nested in others, we must extend Modelable with the new subscript. Or we just don't use subscripts and just use a normal function. Some may argue that another problem with subscripts is that they can't throw, so if we'll use a normal function, let's make it throw.


	enum ModelableErrors:ErrorType { case NothingInKey, CouldNotCast }
	extension Modelable {
		// Let's make them throw, just because I like it so
		func getValue(key:String) throws -> Any {
			guard let value = dictionary[key] else { throw ModelableErrors.NothingInKey }
			return value
		}
		func get<T> (key: Key<Self, T>) throws -> T {
			guard let output = try getValue(key.key) as? T
				else { throw ModelableErrors.CouldNotCast }
			return output
		}
		func get<T:HasDictionary> (key: Key<Self, T>) throws -> T {
			guard let dict = try getValue(key.key) as? [String:AnyObject]
				else { throw ModelableErrors.CouldNotCast }
			return T(dictionary: dict)
		}
		// Define every possible subscript case
		subscript(key: Key<Self, String>) -> String? {
			return try? get(key)
		}
		subscript(key: Key<Self, Int>) -> Int? {
			return try? get(key)
		}
	}
	// After making a NewModel, we teach it to use a Key<Self, NewModel>
	extension Modelable {
		subscript(key: Key<Self, NewModel>) -> NewModel? {
			return try? get(key)
		}
	}

## Result

The API isn't as nice as what I had in mind, but it's close. Let's try it.

	// This is the JSON we're modeling 
	let jsonDictionary = [
		"s" : "this is a string",
		"i" : 1234
	]
	
	// This is how we model it
	struct MyModel:Modelable {
		let dictionary:[String:AnyObject]
	}
	extension Keys where T:Modelable, T.SelfType==MyModel {
		static var string: Key<T, String> { return Key<T, String>(key: "s") }
		static var number: Key<T, Int>    { return Key<T, Int>   (key: "i") }
	}
	
	// And this is how we use it
	let json = MyModel(dictionary: jsonDictionary)
	json[.number]         // => 1234
	json[.string]         // => "this is a string"
	try json.get(.string) // => "this is a string"

It also works with nested models

	// This is the JSON we're modeling 
	let nestedDict = [
		"o": jsonDictionary,
	]
	
	// This is how we model it
	struct NestedModel:Modelable { let dictionary:[String:AnyObject] }
	extension Keys where T:Modelable, T.SelfType==NestedModel {
		static var other: Key<T, MyModel> { return Key<T, MyModel>(key: "o") }
	}
	// remember this is only needed if you want to access it via subscript
	extension Modelable {
		subscript(key: Key<Self, MyModel>) -> MyModel? {
			return try? get(key)
		}
	}
	
	// And this is how we use it
	let nested = NestedModel(dictionary: nestedDict)
	nested[.other]                      // => MyModel
	nested[.other]?[.number]            // => 1234
	nested[.other]?[.string]            // => "this is a string"
	try nested.get(.other).get(.string) // => "this is a string"

Sadly, even though it works, it won't autocomplete unless you use the full type. (e.g ```Key<NestedModel, Any>.⎋```)
