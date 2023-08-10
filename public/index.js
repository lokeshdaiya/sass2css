CodeMirror.commands.autocomplete = function (cm) {
    CodeMirror.showHint(cm, CodeMirror.hint.css);
}
window.onload = function () {
    editor = CodeMirror(document.getElementById("code"), {
        mode: "text/css",
        theme: "neonsyntax",
        lineWrapping: true,
        lineNumbers: true,
        styleActiveLine: true,
        smartIndent: true,
        matchBrackets: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        },
        value: "" + document.getElementById('code').innerHTML + ""
    });

    editor1 = CodeMirror(document.getElementById("css"), {
        mode: "text/css",
        theme: "neonsyntax",
        lineWrapping: true,
        lineNumbers: true,
        styleActiveLine: true,
        matchBrackets: true,
        smartIndent: true,
        readOnly: true,
        extraKeys: {
            "Ctrl-Space": "autocomplete"
        }
    });

    $(".button").click(function () {
        var css = [];
        $('#code pre').each((i, item) => {
            css.push($(item).text().trim());
        });
        css = css.join('\n');
        $.post("/api", { data: css }, function (data, status) {
            editor1.setValue(data);
        });
    });

    $('#select_code').on('change', () => {
        if($('#select_code').val()) {
            editor.setValue(codes[$('#select_code').val()]);
        }
    })

    var codes =
        {
            each: `@each $color in blue, white, red {
.#{$color} {
    color: #{$color}
 }
}
            `,
            for: `@for $i from 1 through 5 {
                li:nth-of-type(#{$i}) {
                    color: hsl($i * 360 / 5, 75%, 75%);
                }
            }
            `
        };
};