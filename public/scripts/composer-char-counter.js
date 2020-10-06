$(document).ready(function () {
  // --- our code goes here ---
  console.log("Load");

  $(".new-tweet  form textarea").on("keyup", function () {
    let counter = $(this).val().length;

    let remainder = 140 - counter;

    $("#counter").val(remainder);
    $("#counter").css("color", remainder < 0 ? "red" : "black");
  });
});
