// <reference path="jquery-3.6.0.js" />
/// <reference path="../jquery-3.6.0.slim.min.js" />

const urlCancion = "https://localhost:44321/api/cancion/";

function ObtenerTodos() {
    $.ajax(
        {
            type: "GET",
            url: urlCancion,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                $.each(data, function (key, value) {
                    $(
                        '<tr>' +
                        '<td>' + value.CAN_ID + '</td>' +
                        '<td>' + value.ALB_ID + '</td>' +
                        '<td>' + value.GEN_ID + '</td>' +
                        '<td>' + value.CAN_NOMBRE + '</td>' +
                        '<td>' + value.CAN_DURACION + '</td>' +
                        '</tr>'
                    ).appendTo("#TablaDatos");
                }

                );
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
}

function ObtenerPorId(id) {
    $.ajax(
        {
            type: "GET",
            url: urlCancion + id,
            dataType: "json",
            success: function (data) {
                detail =
                    "<div><strong>ID:</strong></div>" + "<div>" + data.CAN_ID + "</div>" + "<br />" +
                "<div><strong>Álbum:</strong></div>" + "<div>" + data.ALB_ID + "</div>" + "<br />" +
                "<div><strong>Género:</strong></div>" + "<div>" + data.GEN_ID + "</div>" + "<br />" +
                "<div><strong>Nombre:</strong></div>" + "<div>" + data.CAN_NOMBRE + "</div>" + "<br />" +
                    "<div><strong>Duración:</strong></div>" + "<div>" + data.CAN_DURACION + "</div>" + "<br />";
                $("#lista-datos").html(detail);
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
}

function Crear() {
    var cancionNueva =
    {
        CAN_ID: $("#txt-id").val(),
        ALB_ID: $("#txt-album").val(),
        GEN_ID: $("#txt-genero").val(),
        CAN_NOMBRE: $("#txt-nombre").val(),
        CAN_DURACION: $("#txt-duracion").val(),
    };

    $.ajax(
        {
            type: "POST",
            url: urlCancion,
            data: cancionNueva,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.CAN_ID);
                $("#nombre-insertado").val(data.CAN_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert('Status: ' + textStatus + ' (' + errorThrown + ') ');
            }
        }
    );

    //limpiarCampos();
}

/****************************************/
function Actualizar() {
    var cancionActualizado =
    {
        CAN_ID: $("#CAN_ID").val(), 
        ALB_ID: $("#ALB_ID").val(),
        GEN_ID: $("#GEN_ID").val(),
        CAN_NOMBRE: $("#CAN_NOMBRE").val(),
        CAN_DURACION: $("#CAN_DURACION").val(),
    };
    $.ajax(
        {
            type: "PUT",
            url: urlArtista + cancionActualizado.CAN_ID,
            data: cancionActualizado,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.CAN_ID);
                $("#nombre-insertado").val(data.CAN_NOMBRE);

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
            url: urlCancion + id,
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
    $("#artista-id").val("");

}

function limpiarCampos() {
    $("#txt-id").val("")
    $("#txt-album").val("")
    $("#txt-genero").val("")
    $("#txt-nombre").val("")
    $("#txt-duracion").val("")
}