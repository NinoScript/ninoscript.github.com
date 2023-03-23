function boxSvg(width, height, depth) {
    // const delta_height = height - 113.4;
    const delta_width = width - 59.5;
    const delta_depth = depth - 58.1;

    // horizontales
    const x1 = 20.2;
    const x2 = x1 + 58.1 + delta_depth;
    const x3 = x2 + 59.5 + delta_width;
    const x4 = x3 + 59.6 + delta_depth;
    const x5 = x4 + 59.6 + delta_width;
    const x6 = x5 + 40;

    // horizontales derivadas
    const horizontalThickness1 = 14.2;
    const horizontalThickness2 = 49;
    const h1 = x2 - horizontalThickness2;
    const h2 = x2 + horizontalThickness1;
    const h3 = x3 - horizontalThickness1;
    const h4 = x3 - 2.2; // por qué este no es simétrico con h1? hubiese esperado que fuera x3 + horizontalThickness2

    // verticales
    const y1 = 99.1;
    const y2 = y1 + height;
    const y3 = y2 + 100;

    // verticales derivadas
    const verticalThickness1 = 58.1;
    const verticalThickness2 = 59.5;
    const verticalThickness3 = 47.5;
    const v0 = y1 - verticalThickness3;
    const v1 = y1 - verticalThickness2;
    const v2 = y1 - verticalThickness1;
    const v3 = y2 + verticalThickness1;
    const v4 = y2 + verticalThickness2;
    const v5 = y2 + verticalThickness3;

    const body = ''
        // arriba
        + `<path class="cut"  d="M${x2},${y1}v-47.4"/>`
        + `<path class="cut"  d="M${h2},${v2}v2.8"/>`
        + `<path class="cut"  d="M${x2},${v0}v-3.3c0-0.2,0-0.3,0.1-0.5l2.1-8.2h10.6c0.8,0,1.4,0.6,1.4,1.4"/>`
        + `<path class="cut"  d="M${h4},${v1}c0-14.2-7.8-18.7-20.1-23.9c-2.4-1-4.9-1.5-7.5-1.5h${-delta_width}c-2.6,0-5.1,0.5-7.5,1.5c-12.3,5.2-20.1,9.7-20.1,23.9"/>`
        + `<path class="fold" d="M${h2},${v2}h${h1 + delta_width - delta_depth}"/>`
        + `<path class="cut"  d="M${x3},${y1}v-47.4"/>`
        + `<path class="cut"  d="M${h3},${v2}v2.8"/>`
        + `<path class="cut"  d="M${h3},${v2}c0-0.8,0.6-1.4,1.4-1.4h10.6l2.1,8.2c0,0.2,0.1,0.3,0.1,0.5v3.3"/>`
        // abajo
        + `<path class="cut"  d="M${x2},${y2}v47.5"/>`
        + `<path class="cut"  d="M${h2},${v3}v-2.8"/>`
        + `<path class="cut"  d="M${x2},${v5}v3.3c0,0.2,0,0.3,0.1,0.5l2.1,8.2h10.6c0.8,0,1.4-0.6,1.4-1.4"/>`
        + `<path class="fold" d="M${h2},${v3}h${h1 + delta_width - delta_depth}"/>`
        + `<path class="cut"  d="M${h3},${v3}c0,0.8,0.6,1.4,1.4,1.4h10.6l2.1-8.2c0-0.2,0.1-0.3,0.1-0.5v-50.8"/>`
        + `<path class="cut"  d="M${h4},${v4}c0,14.2-7.8,18.7-20.1,23.9c-2.4,1-4.9,1.5-7.5,1.5h${-delta_width}c-2.6,0-5.1-0.5-7.5-1.5c-12.3-5.2-20.1-9.7-20.1-23.9"/>`
        + `<path class="cut"  d="M${h3},${v3}v-2.8"/>`
        // atras
        + `<path class="fold" d="M${x2},${y1}h${width}"/>`
        + `<path class="fold" d="M${x2},${y2}h${width}"/>`
        + `<path class="fold" d="M${x2},${y1}v${height}"/>`
        + `<path class="fold" d="M${x3},${y2}v-${height}"/>`
        // delante
        + `<path class="cut"  d="M${x5},${y2}l12.3-4.2c3.9-1.4,6.6-5.1,6.6-9.2v-${height - 26.9}c0-4.2-2.6-7.9-6.6-9.2l-12.3-4.2"/>`
        + `<path class="fold" d="M${x4},${y1}v${height}"/>`
        + `<path class="fold" d="M${x5},${y2}v-${height}"/>`
        + `<path class="cut"  d="M${x5},${y1}h-${width}"/>`
        + `<path class="cut"  d="M${x5},${y2}h-${width}"/>`
        // izquierda
        + `<path class="cut"  d="M${x1},${y1}v-5.9c0-0.8,0.3-1.5,0.8-2l7.1-7.1c0.4-0.4,0.6-0.8,0.8-1.4l5.4-23.5c1-4.4,5-7.6,9.5-7.6h${16.6 + delta_depth}c4.6,0,8.6,3.2,9.5,7.7l8.4,39.7"/>`
        + `<path class="cut"  d="M${x1},${y2}v5.9c0,0.8,0.3,1.5,0.8,2l7.1,7.1c0.4,0.4,0.6,0.8,0.8,1.4l5.4,23.5c1,4.4,5,7.6,9.5,7.6h${16.6 + delta_depth}c4.6,0,8.6-3.2,9.5-7.7l8.4-39.7"/>`
        + `<path class="cut"  d="M${x1},${y2}v-${height}"/>`
        + `<path class="fold" d="M${x2},${y1}h-${depth}"/>`
        + `<path class="fold" d="M${x2},${y2}h-${depth}"/>`
        // derecha
        + `<path class="cut"  d="M${x4},${y1}v-5.9c0-0.8-0.3-1.5-0.8-2l-7.1-7.1c-0.4-0.4-0.6-0.8-0.8-1.4l-5.4-23.5c-1-4.4-5-7.6-9.5-7.6h${-15.9 - delta_depth}c-4.6,0-8.6,3.2-9.5,7.7l-8.4,39.7"/>`
        + `<path class="cut"  d="M${x4},${y2}v5.9c0,0.8-0.3,1.5-0.8,2l-7.1,7.1c-0.4,0.4-0.6,0.8-0.8,1.4l-5.4,23.5c-1,4.4-5,7.6-9.5,7.6h${-15.9 - delta_depth}c-4.6,0-8.6-3.2-9.5-7.7l-8.4-39.7"/>`
        + `<path class="fold" d="M${x3},${y2}h${depth}"/>`
        + `<path class="cut"  d="M${x4},${y2}h2.2"/>`
        + `<path class="fold" d="M${x3},${y1}h${depth}"/>`
        + `<path class="cut"  d="M${x4},${y1}h2.2"/>`
        ;

    const header = ''
        + '<?xml version="1.0" encoding="utf-8"?>'
        + '<!-- Generator: Adobe Illustrator 25.4.1, SVG Export Plug-In . SVG Version: 6.00 Build 0) -->'
        + '<svg version="1.1"'
        + ' id="Capa_1"'
        + ' xmlns="http://www.w3.org/2000/svg"'
        + ' xmlns:xlink="http://www.w3.org/1999/xlink"'
        + ' x="0px"'
        + ' y="0px"'
        + ` viewBox="0 0 ${x6} ${y3}"`
        + ' style="enable-background:new 0 0 311.8 311.8;"'
        + ' xml:space="preserve">'
        ;
    const footer = '</svg>';

    const svg = `${header}${body}${footer}`;
    return svg;
}

const svgdiv = document.getElementById("svgdiv");
const svgcode = document.getElementById("svgcode");

function makeSvg() {
    const height = +heightSlider.value;
    const width = +widthSlider.value;
    const depth = +depthSlider.value;
    return boxSvg(width, height, depth);
}

document.getElementById("copy").addEventListener("click", function () {
    navigator.clipboard.writeText(makeSvg());
});

const widthSlider = document.getElementById('width-slider');
const heightSlider = document.getElementById('height-slider');
const depthSlider = document.getElementById('depth-slider');

const urlParams = new URLSearchParams(window.location.search);
widthSlider.value = urlParams.get('width') ?? widthSlider.value;
heightSlider.value = urlParams.get('height') ?? heightSlider.value;
depthSlider.value = urlParams.get('depth') ?? depthSlider.value;

function onInput() {
    const svg = makeSvg();

    svgdiv.innerHTML = svg;
    svgcode.value = svg;
}

widthSlider.addEventListener('input', onInput);
heightSlider.addEventListener('input', onInput);
depthSlider.addEventListener('input', onInput);

function onChange() {
    urlParams.set('width', widthSlider.value);
    urlParams.set('height', heightSlider.value);
    urlParams.set('depth', depthSlider.value);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    console.log(`saved to URL params: ${urlParams}`);
}

widthSlider.addEventListener('change', onChange);
heightSlider.addEventListener('change', onChange);
depthSlider.addEventListener('change', onChange);

onChange();
onInput();
