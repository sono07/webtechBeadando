function loadCars() {
    manSelector();
    loadCarData();
    $("#carForm").submit( function (s) {
        s.preventDefault();
        $.ajax({
            url: '/addCar',
            type: 'post',
            data: $('#carForm').serialize(),
            success: function () {
                alert("Autó hozzáadva!");
                $("input").val("");
                manSelector();
                loadCarData();
            },
            error: function () {
                alert("Hiba történt! Lehet, hogy már van ilyen autó az adatbázisban.");
            }
        });
    });
}

function manSelector() {
    $.get('/manufacturerNames', function (names) {
        var $manufacturerSelector = $("#manufacturerSelector");
        $manufacturerSelector.empty();
        for (var man of names) {
            $manufacturerSelector.append('<option>' + man + "</option>");
        }
    })
}

function getModelData() {
    $.ajax({
        url: '/manufacturer',
        type: 'get',
        success: function (data) {
            var carStr ='';
            for (var car of data) {
                carStr += ("\n " + car.name);
            }
            alert("A gyártó modelljei: " + carStr);
        },
        error: function () {
            alert("Hiba történt az adatbázis lekérdezésekor!");
        }
    });
}

function loadCarData() {
    $.get('/cars', function (cars) {
        var $carContainer = $("#carContainer");
        $carContainer.empty();
        $carContainer.append("<tr><th>Típus</th><th>Fogyasztás</th><th>Szín</th><th>Gyártó</th><th>Gyártási év</th><th>Elérhető darabszám</th><th>Lóerő</th></tr>");
        for (var car of cars) {
            $carContainer.append($("<tr class='container' attr='" + car.manufacturer + "'><td>" + car.name
                + "</td><td>" + car.consumption + "</td><td>" + car.color + "</td><td>" + car.manufacturer
                + "</td><td>" + car.year + "</td><td>" + car.available + "</td><td>" + car.horsepower
                + "</td></tr>").click(function() {document.cookie = "name=" + this.getAttribute('attr');
                getModelData();
            }));
        }
    });
}