import JSZip from "jszip";

var count=0
var exportHtml=""


export default function exportToHtml(darkTheme,isDark) {
    var c1;
    var c1Dark;
    var c2;
    var c2Dark;
    if(isDark){
        c1Dark=document.getElementById("thisishead").innerHTML.match(/<style data-styled[^>]*>([^<]*)/)[1]
        c2Dark = `
    
<html>
  <head>
    <title>title</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
  </head>
  <body>
    ${document.getElementById("areas").innerHTML}
  </body>
</html>
    
    `
    }else{
        c1=document.getElementById("thisishead").innerHTML.match(/<style data-styled[^>]*>([^<]*)/)[1]
        c2 = `
    
<html>
  <head>
    <title>title</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
  </head>
  <body>
    ${document.getElementById("areas").innerHTML}
  </body>
</html>
    
    `
    }

    darkTheme(!isDark)
    setTimeout(()=>{
        if(!isDark){
            c1Dark=document.getElementById("thisishead").innerHTML.match(/<style data-styled[^>]*>([^<]*)/)[1]
            c2Dark = `
    
<html>
  <head>
    <title>title</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
  </head>
  <body>
    ${document.getElementById("areas").innerHTML}
  </body>
</html>
    
    `
        }else{
            c1=document.getElementById("thisishead").innerHTML.match(/<style data-styled[^>]*>([^<]*)/)[1]
            c2 = `
    
<html>
  <head>
    <title>title</title>
    <link rel="stylesheet" type="text/css" href="./style.css">
  </head>
  <body>
    ${document.getElementById("areas").innerHTML}
  </body>
</html>
    
    `
        }

        c1Dark+=`body{background-color:#1D2533}`

        darkTheme(isDark)

        var zip = new JSZip();

        var light = zip.folder("lightTheme");
        light.file("style.css", c1);
        light.file("index.html", c2);

        var light = zip.folder("darkTheme");
        light.file("style.css", c1Dark);
        light.file("index.html", c2Dark);

        zip.generateAsync({type:"blob"}).then(function(content) {
            window.location=URL.createObjectURL(content)
        });
    },0)


}





export function exportToHtmlLEGACY(elem, first = true,cssExport="") {


    var childrens = elem.children
    if(first){
        exportHtml=elem.innerHTML

    }
    for (var e in childrens){
        if((Number(e)==e.toString())){
            count++
            var theCSSprop = window.getComputedStyle(childrens[e], null)
            var properties = ["color", "overflow", "text-overflow", "margin", "font-family", "font-style", "font-feature-settings",
                "font-weight", "font-size", "line-height", "cursor", "white-space", "-webkit-writing-mode", "text-rendering", "text-align", "background-color",
                "border-radius","padding","height","width","min-width","max-width","align-items","border","position","top","left","right","bottom","display","background",
            "transition","-webkit-transition","-webkit-tap-highlight-color","content"]


            if(childrens[e].className!=""){
                var to = childrens[e].className.toString()+count.toString()
                to=to.split("")
                to[1]=count.toString()
                to=to.join("")
                cssExport+=(`.${to.replaceAll(" ",".")}{\n`)

                exportHtml=exportHtml.replace(childrens[e].className,to)

            for(var i in properties){
                cssExport+=(`\t${properties[i]}: ${theCSSprop.getPropertyValue(properties[i])};\n`)
            }
            cssExport+=('}\n')
            }
            if(childrens[e].children.length>0){
                console.log(childrens[e].children)
                for(var k in childrens){

                    var buff= exportToHtml(childrens[k],false,cssExport)
                    cssExport=buff[0]
                }
            }
        }else{
            continue
        }

    }
    if(first){
        // console.log(cssExport)
        console.log(exportHtml)
    }else{
        return [cssExport,childrens]
    }
}