---
layout: page
title: Cristián Arenas
tagline: I'm here to do some programming
---
{% include JB/setup %}

Hello, I'm Cristián Arenas Ulloa (AKA NinoScript).
<br>I'm trying out some things with Swift right now,
<br>so I set this up so I can put my thoughts down.

## Posts

<ul class="posts">
	{% for post in site.posts %}
		<li><span>{{ post.date | date_to_string }}</span> &raquo; <a href="{{ BASE_PATH }}{{ post.url }}">{{ post.title }}</a></li>
	{% endfor %}
</ul>
