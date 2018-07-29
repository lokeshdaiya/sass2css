CodeMirror.commands.autocomplete = function(cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.css);
}
window.onload = function() {
    editor = CodeMirror(document.getElementById("code"), {
        mode: "text/css",
        theme: "neonsyntax",
        lineWrapping: true,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        },
        value: " "+document.getElementById('code').innerHTML +" "
    });

    editor1 = CodeMirror(document.getElementById("css"), {
        mode: "text/css",
        theme: "neonsyntax",
        lineWrapping: true,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        }
    });

    $(".button").click(function(){
        var css = $('#code pre').text();
        $.post("/api", {data:css}, function(data, status){
            editor1.setValue(data);
        });
    });

    
};