jQuery(document).ready(function() {

    $("#content").load("main.html");
    $("#mainGomb").click(function () {
        $("#content").load("main.html");
    });
    $("#autokGomb").click(function () {
        $("#content").load("cars.html", function () {
            loadCars();
        });
    });
    $("#gyartokGomb").click(function () {
        $("#content").load("manufacturers.html", function () {
            loadManufacturers();
        });
    });
});