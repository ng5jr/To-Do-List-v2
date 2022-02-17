var toDoItems = [];
var storedItems = [];

function items() {
  var totalItems = $("li").length - 1;
  var completedItems = $(".crossed").length;
  var itemsLeft = totalItems - completedItems;

  $(".items-left").text(itemsLeft + " items left");
}

window.onload = function createOldItems() {
  if (localStorage.getItem("storedItems") != null) {
    storedItems = JSON.parse(localStorage.getItem("storedItems"));
    toDoItems = storedItems;
    function create() {
      for (i = 0; i < storedItems.length; i++) {
        var oldItem = storedItems[i];
        $("li:first-child").clone(true).appendTo("ul");
        $("li:last-child h4").text(oldItem);
        $("li:last-child").show();
        items();
      }
    }
    setTimeout(create, 500);
  } else {
    alert("no");
  }
};

window.onbeforeunload = function () {
  localStorage.setItem("storedItems", JSON.stringify(toDoItems));
};

$(".icon").click(function () {
  $(".content1").toggleClass("active");
  $("body").toggleClass("active");
  $("footer").toggleClass("active");
  $(".sun").toggle();
  $(".moon").toggle();
  $(".input-text").toggleClass("asd");
  $(".content").toggleClass("asd");
  $(".item").toggleClass("asd");
  $("li").toggleClass("asd");
  $(".end").toggleClass("asd");
  $(".button").toggleClass("asd");
  $(".items-left").toggleClass("asd");
  $(".completed").toggleClass("asd");
});

$(".dot").click(function () {
  $(this).children("svg").toggleClass("asd");
  $(this).toggleClass("checked");
  $(this).parent().toggleClass("crossed");
});

$("li").on("mouseenter", function () {
  $(this).children(".cross").css("z-index", "1000");
});
$("li").on("mouseleave", function () {
  $(this).children(".cross").css("z-index", "-1000");
});
$(".cross").click(function () {
  $(this).parent().remove();
  var item = $(this).parent("li").children("h4").text();
  console.log(item);
  var index = toDoItems.indexOf(item);
  toDoItems.splice(index, 1);
});

$(document).ready(function () {
  $("li:first-child").hide();
  items();
});

$("#myInput").on("keydown", function (event) {
  var toAdd = $("#myInput").val();
  var inputText = $("#myInput").val().length;
  if (event.keyCode == 13 && inputText === 0) {
    items();
    return false;
  } else if (event.keyCode == 13) {
    event.preventDefault();
    $("li:first-child").clone(true).appendTo("ul");
    $("li:last-child h4").text(toAdd);
    $("li:last-child").show();
    $("#myInput").val("");
    toDoItems.push(toAdd);
    items();
  }
});

$(function () {
  $("#myUl").sortable();
});

$(document).click(function () {
  items();
});

$(".button-active").click(function () {
  $("li").show();
  $("li:first-child").hide();
  $(".crossed").hide();
});

$(".all").click(function () {
  $(".crossed").show();
  $("li").show();
  $("li:first-child").hide();
});

$(".button-completed").click(function () {
  $("li").hide();
  $(".crossed").show();
});

$(".completed").click(function () {
  var allItems = toDoItems;

  for (var i = 0; i < allItems.length; i++) {
    const item = $(".crossed h4")[i].innerText;
    // const index = toDoItems.indexOf(item);
    // toDoItems.splice(index, 1);
    allItems = allItems.filter((e) => e !== item); // will return ['A', 'C']
  }
  toDoItems = allItems;
  $(".crossed").remove();
});

