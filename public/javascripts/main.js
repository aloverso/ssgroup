var $form = $("#ajax-form");

var $makegroups = $("#group-form");

var onSuccessList = function(data, status) {
	for (var i=0; i<data.length; i++) {
		console.log("hello");
		listItem(data[i], 1);
	}
}

function makeClassList() {
  $("#result ul").html("");
  $.get("getlist", {})
    .done(onSuccessList)
    .error(onError);
}

function listItem(item) {
  var student = "<li>"+item+"</li>";
  $("#result ul").append(student);
}

var onSuccess = function(data, status) {
  makeClassList();
};

var onError = function(data, status) {
  console.log("status", status);
  console.log("error", data);
};

$form.submit(function(event) {
  event.preventDefault();
  var name = $form.find("[name='name']").val();
  var adddrop = $form.find("[name='adddrop']:checked").val();
  $.get("handler", {
    name: name,
    adddrop: adddrop
  })
    .done(onSuccess)
    .error(onError);
});

var onSuccessGroups = function(data, status) {
	$("#groups").html("<h3>Groups</h3>");
	for (var currentgroup = 0; currentgroup<data.length; currentgroup++) {
		$("#groups").append("<h5>Group "+(currentgroup+1)+"</h5>");
		$("#groups").append("<ul>");
		for (var currentstudent = 0; currentstudent<data[currentgroup].length; currentstudent++) {
			$("#groups").append("<li>"+data[currentgroup][currentstudent]+"</li>");
		}
		$("#groups").append("</ul>");
	}
}

$makegroups.submit(function(event) {
  event.preventDefault();
  var num = $makegroups.find("[name='number']").val();
  var numtype = $makegroups.find("[name='numtype']:checked").val();
  $.get("makegroups", {
  	num: num,
  	numtype: numtype
  })
    .done(onSuccessGroups)
    .error(onError);
});

makeClassList();
