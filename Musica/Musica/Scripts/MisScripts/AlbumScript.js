/// <reference path="../jquery-3.6.0.slim.min.js" />
/// <reference path="artistascript.js" />

//onst { error } = require("jquery");

let urlAlbum = "http://localhost:9072/api/album/";
let urlArtista = "http://localhost:9072/api/artista/";

function alertar() {
    alert("hola");
}

function ObtenerTodosLosAlbumes() {
    // obtener el objeto con los albumes
    $.ajax({
        type: "GET",
        url: urlAlbum,
        dataType: "json",
        success: function (dataAlbum, textStatus, jqXHR) {
            // si logra obtener los albumes, obtiene los artistas
            $.ajax({
                type: "GET",
                url: urlArtista,
                dataType: "json",
                success: function (dataArtista, textStatus, jqXHR) {
                    // si logra obtener los artistas, itero por el objeto de albumes para imprimirlos en la tabla
                    $.each(dataAlbum, function (keyAlbum, valueAlbum) {
                        // busco el nombre del artista comparando la FK de ALBUM y la PK de ARTISTA
                        let descripcionArtista = dataArtista.find(function (value, index, array) {
                            if (value.ART_ID == valueAlbum.ART_ID) {
                                return value.ART_NOMBRE;
                            }
                        }).ART_NOMBRE;
                        $(
                            '<tr>' +
                            '<td>' + valueAlbum.ALB_ID + '</td>' +
                            '<td>' + descripcionArtista + '</td>' +
                            '<td>' + valueAlbum.ALB_NOMBRE + '</td>' +
                            '<td>' + valueAlbum.ALB_FECHA_LANZAMIENTO + '</td>' +
                            '</tr>'
                        ).appendTo("#TablaDatos");
                    });
                },
                error: function (jqHHR, textStatus, errorThrown) {
                    alert($`Status: ${textStatus} (${errorThrown})`);
                }
            });
        },
        error: function (jqHHR, textStatus, errorThrown) {
            alert($`Status: ${textStatus} (${errorThrown})`);
        }
    });
}

let helpers =
{
    buildDropdown: function (result, dropdown, emptyMessage) {
        // Remove current options
        dropdown.html('');

        // Add the empty option with the empty message
        dropdown.append('<option value="">' + emptyMessage + '</option>');

        // Check result isnt empty
        if (result != '') {
            // Loop through each of the results and append the option to the dropdown
            $.each(result, function (k, v) {
                dropdown.append('<option value="' + v.ART_ID + '">' + v.ART_NOMBRE + '</option>');
            });
        }
    }
}

function cargarComboBox(item) {
    $.ajax({
        type: "GET",
        url: urlArtista,
        dataType: "json",
        success: function (data) {
            helpers.buildDropdown(data, $('#dropdown'), 'Selecciona un artista');
        },
        error: function (jqHHR, textStatus, errorThrown) {
            alert($`Status: ${textStatus} (${errorThrown})`);
        }
    });
}



function ObtenerAlbumPorId(albumId) {
    $.ajax({
        type: "GET",
        url: urlAlbum + albumId,
        dataType: "json",
        success: function (dataAlbum) {
            // si logra obtener los albumes, obtiene el artistas con la FK
            $.ajax({
                type: "GET",
                url: urlArtista + dataAlbum.ART_ID,
                dataType: "json",
                success: function (dataArtista, textStatus, jqXHR) {
                    detail =
                        "<div><strong>ID:</strong></div>" + "<div>" + dataAlbum.ALB_ID + "</div>" + "<br />" +
                        "<div><strong>Nombre:</strong></div>" + "<div>" + dataAlbum.ALB_NOMBRE + "</div>" + "<br />" +
                        "<div><strong>Artista:</strong></div>" + "<div>" + dataArtista.ART_NOMBRE + "</div>" + "<br />" +
                        "<div><strong>Fecha de lanzamiento:</strong></div>" + "<div>" + dataAlbum.ALB_FECHA_LANZAMIENTO + "</div>" + "<br />";
                    $("#lista-albumes").html(detail);
                },
                error: function (jqHHR, textStatus, errorThrown) {
                    alert($`Status: ${textStatus} (${errorThrown})`);
                }
            });
        },
        error: function (jqHHR, textStatus, errorThrown) {
            alert($`Status: ${textStatus} (${errorThrown})`);
        }
    });
}

function CrearAlbum() {
    var albumNuevo =
    {
        ALB_ID: $("#ALB_ID").val(),
        ALB_NOMBRE: $("#ALB_NOMBRE").val(),
        ART_ID: $("#dropdown").val(),
        ALB_FECHA_LANZAMIENTO: $("#ALB_FECHA_LANZAMIENTO").val()
    };

    $.ajax(
        {
            type: "POST",
            url: urlAlbum,
            data: albumNuevo,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.ALB_ID);
                $("#nombre-insertado").val(data.ALB_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );

    limpiarCampos();
}

function Actualizar() {
    var albumActualizado =
    {
        ALB_ID: $("#ALB_ID").val(),
        ALB_NOMBRE: $("#ALB_NOMBRE").val(),
        ART_ID: $("#dropdown").val(),
        ALB_FECHA_LANZAMIENTO: $("#ALB_FECHA_LANZAMIENTO").val()
    };
    $.ajax(
        {
            type: "PUT",
            url: urlAlbum + albumActualizado.ALB_ID,
            data: albumActualizado,
            contenType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status, jqXHR) {
                $("#id-insertado").val(data.ALB_ID);
                $("#nombre-insertado").val(data.ALB_NOMBRE);

            },
            error: function (jqHHR, textStatus, errorThrown) {
                alert($`Status: ${textStatus} (${errorThrown})`);
            }
        }
    );
    limpiarCampos();
}

function Eliminar(id) {
    $.ajax(
        {
            type: "DELETE",
            url: urlAlbum + id,
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
    $("#album-id").val("");

}

function limpiarCampos() {
    $("#ALB_ID").val("");
    $("#ALB_NOMBRE").val("");
    $("#ALB_FECHA_LANZAMIENTO").val("");
}