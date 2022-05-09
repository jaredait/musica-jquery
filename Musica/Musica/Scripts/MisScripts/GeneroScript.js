/// <reference path="../jquery-3.6.0.slim.min.js" />

//onst { error } = require("jquery");

let urlGenero = "https://localhost:44321/api/genero/";



function ObtenerTodos() {
    $.ajax(
        {
            type: "GET",
            url: urlGenero,
            dataType: "json",    // para post put o delete usar contentType. dataType especifica el tipo de dato que el servidor devolvera.
            success: function (data, textStatus, jqXHR) {
                $.each(data, function (key, value) {
                    $(
                        '<tr>' +
                        '<td>' + value.GEN_ID + '</td>' +
                        '<td>' + value.ALB_NOMBRE + '</td>' +
                        '</tr>'
                    ).appendTo("#GeneroTabla");
                }

                );
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
}

function ObtenerGeneroPorId(generoId) {
    $.ajax(
        {
            type: "GET",
            url: urlGenero + generoId,
            dataType: "json",
            success: function (data) {
                detail = "<div><strong>ID:</strong></div>" + "<div>" + data.GEN_ID + "</div>" + "<br />" +
                    "<div><strong>Nombre:</strong></div>" + "<div>" + data.GEN_NOMBRE + "</div>" + "<br />" +
                     "<br />";
                $("#lista-albumes").html(detail);
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
}

function CrearGenero() {
    var GeneroNuevo =
    {
        GEN_ID: $("#GEN_ID").val(),
        GEN_NOMBRE: $("#GEN_NOMBRE").val(),
    };

    $.ajax(
        {
            type: "POST",
            url: urlGenero,
            data: GeneroNuevo,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.GEN_ID);
                $("#nombre-insertado").val(data.GEN_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );

    //limpiarCampos();
}

function Actualizar() {
    var GeneroActualizado =
    {
        GEN_ID: $("#GEN_ID").val(),
        GEN_NOMBRE: $("#GEN_NOMBRE").val(),
    };
    $.ajax(
        {
            type: "PUT",
            url: urlGenero + GeneroActualizado.GEN_ID,
            data: GeneroActualizado,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.GEN_ID);
                $("#nombre-insertado").val(data.GEN_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
    //limpiarCampos();
}

function Eliminar(id) {
    $.ajax(
        {
            type: "DELETE",
            url: urlGenero + id,
            dataType: "json",
            success: function (data) {
                if (data === null || data === undefined) {

                }

                window.location.reload();
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert('Status: ' + textStatus + ' (' + errorThrown + ')');
            }
        }
    );
    $("#genero-id").val("");

}