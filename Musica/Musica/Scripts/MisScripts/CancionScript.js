// <reference path="jquery-3.6.0.js" />
/// <reference path="../jquery-3.6.0.slim.min.js" />

const urlCancion = "http://localhost:9072/api/cancion/";
const urlGenero = "http://localhost:9072/api/genero/";
const urlAlbum = "http://localhost:9072/api/album/";

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

let helpers =
{
    buildDropdown: function (result, dropdown, emptyMessage, tipo) {
        // Remove current options
        dropdown.html('');

        // Add the empty option with the empty message
        dropdown.append('<option value="">' + emptyMessage + '</option>');

        // Check result isnt empty
        if (result != '' && tipo === 'ALBUM') {
            // Loop through each of the results and append the option to the dropdown
            $.each(result, function (k, v) {
                dropdown.append('<option value="' + v.ALB_ID + '">' + v.ALB_NOMBRE + '</option>');
            });
        }
        if (result != '' && tipo === 'GENERO') {
            // Loop through each of the results and append the option to the dropdown
            $.each(result, function (k, v) {
                dropdown.append('<option value="' + v.GEN_ID + '">' + v.GEN_NOMBRE + '</option>');
            });
        }
    }
}

function cargarComboBoxAlbum() {
    $.ajax({
        type: "GET",
        url: urlAlbum,
        dataType: "json",
        success: function (data) {
            helpers.buildDropdown(data, $('#dropdownAlbum'), 'Selecciona un álbum', 'ALBUM');
        },
        error: function (jqHHR, textStatus, errorThrown) {
            alert($`Status: ${textStatus} (${errorThrown})`);
        }
    });
}

function cargarComboBoxGenero() {
    $.ajax({
        type: "GET",
        url: urlGenero,
        dataType: "json",
        success: function (data) {
            helpers.buildDropdown(data, $('#dropdownGenero'), 'Selecciona un género', 'GENERO');
        },
        error: function (jqHHR, textStatus, errorThrown) {
            alert($`Status: ${textStatus} (${errorThrown})`);
        }
    });
}

function Crear() {
    var cancionNueva =
    {
        CAN_ID: $("#txt-id").val(),
        ALB_ID: $("#dropdownAlbum").val(),
        GEN_ID: $("#dropdownGenero").val(),
        CAN_NOMBRE: $("#txt-nombre").val(),
        CAN_DURACION: $("#txt-duracion").val()
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

    limpiarCampos();
}


function Eliminar(id) {
    $.ajax(
        {
            type: "DELETE",
            url: urlCancion + id,
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
    $("#txt-id").val("");

}

function Actualizar() {
    var cancionActualizada =
    {
        CAN_ID: $("#txt-id").val(),
        ALB_ID: $("#dropdownAlbum").val(),
        GEN_ID: $("#dropdownGenero").val(),
        CAN_NOMBRE: $("#txt-nombre").val(),
        CAN_DURACION: $("#txt-duracion").val(),
    };

    $.ajax(
        {
            type: "PUT",
            url: urlCancion + cancionActualizada.CAN_ID,
            data: cancionActualizada,
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
    limpiarCampos();
}

function limpiarCampos() {
    $("#txt-id").val("");
    $("#txt-nombre").val("");
    $("#txt-duracion").val("");
}