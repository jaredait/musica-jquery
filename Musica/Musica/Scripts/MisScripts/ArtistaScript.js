// <reference path="jquery-3.6.0.js" />
/// <reference path="../jquery-3.6.0.slim.min.js" />

const urlArtista = "http://localhost:9070/api/artista/";

function ObtenerTodos() {
    $.ajax(
        {
            type: "GET",
            url: urlArtista,
            dataType: "json",
            success: function (data, textStatus, jqXHR) {
                $.each(data, function (key, value) {
                    $(
                        '<tr>' +
                        '<td>' + value.ART_ID + '</td>' +
                        '<td>' + value.ART_NOMBRE + '</td>' +
                        '<td>' + value.ART_EMAIL + '</td>' +
                        '<td>' + value.ART_FECHA_CREACION + '</td>' +
                        '<td>' + value.ART_CANT_INTEGRANTES + '</td>' +
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
            url: urlArtista + id,
            dataType: "json",
            success: function (data) {
                detail =
                    "<div><strong>ID:</strong></div>" + "<div>" + data.ART_ID + "</div>" + "<br />" +
                    "<div><strong>Nombre:</strong></div>" + "<div>" + data.ART_NOMBRE + "</div>" + "<br />" +
                    "<div><strong>Email:</strong></div>" + "<div>" + data.ART_EMAIL + "</div>" + "<br />" +
                    "<div><strong>Fecha de creación:</strong></div>" + "<div>" + data.ART_FECHA_CREACION + "</div>" + "<br />" +
                    "<div><strong>No. integrantes:</strong></div>" + "<div>" + data.ART_CANT_INTEGRANTES + "</div>" + "<br />";
                $("#lista-datos").html(detail);
            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
}

function Crear() {
    var artistaNuevo =
    {
        CAN_ID: $("#txt-id").val(),
        ALB_ID: $("#txt-nombre").val(),
        GEN_ID: $("#txt-email").val(),
        CAN_NOMBRE: $("#txt-fecha-creacion").val(),
        CAN_DURACION: $("#txt-cant-integrantes").val(),
    };
    console.log(artistaNuevo);
    $.ajax(
        {
            type: "POST",
            url: "https://localhost:44321/api/artista/",
            data: artistaNuevo,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.ART_ID);
                $("#nombre-insertado").val(data.ART_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert('Status: ' + textStatus + ' (' + errorThrown + ') ');
            }
        }
    );

    //limpiarCampos();
}

function limpiarCampos() {
    $("#txt-id").val("")
    $("#txt-nombre").val("")
    $("#txt-email").val("")
    $("#txt-fecha-creacion").val("")
    $("#txt-cant-integrantes").val("")
}