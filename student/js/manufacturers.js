function loadManufacturers() {
    loadManufacturerData();
    var $manufacturerForm = $('#manufacturerForm');
    $manufacturerForm.submit(function (s) {
        s.preventDefault();
        $.ajax({
            url: '/addManufacturers',
            type: 'post',
            data: $manufacturerForm.serialize(),
            success: function () {
                $("input").val("");
                loadManufacturerData()
            },
            error: function () {
                alert("Hiba történt! Lehet, hogy már létezik a gyártó az adatbázisban.");
            }
        });
    });
}

function loadManufacturerData() {
    return $.get('/manufacturers', function(manufacturers) {
        var $manufacturerContainer = $("#manufacturerContainer");
        $manufacturerContainer.empty();
        $manufacturerContainer.append("<tr><th>Gyártó</th><th>Ország</th><th>Alapítva</th></tr>");
        for(var manufacturer of manufacturers) {
            $manufacturerContainer.append("<tr class='container'><td>" + manufacturer.name + "</td><td>"
                + manufacturer.country + "</td><td>" + (new Date(manufacturer.founded)).toLocaleDateString()
                + "</td></tr>");
        }});
}