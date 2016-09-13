$(".insertdata").click(function(){
    $("#myModal").modal();
    $(".myform").attr("action","/insertdata");
    $(".num").val("").removeAttr("readonly");
})
$(".removedata").click(function(){
    var result = confirm("确定要删除吗？");
    if(result){
        var number = $(this).attr("data_num");
        var $form = $("<form>");
        var $input = $("<input>");
        $form.attr("action","/removedata");
        $form.attr("method","post");
        $input.val(number);
        $input.attr("name","num");
        $form.append($input);
        $form.submit();
    }
})
$(".updatedata").click(function () {
    $("#myModal").modal();
    $(".myform").attr("action","/updatedata");
    var number = $(this).attr("data_num");
    $(".num").val(number).attr("readonly","readonly");
})