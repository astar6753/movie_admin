$(function(){
    
    $("#save").click(function(){
        if(isEmpty($("#genre_name").val())) {
            alert("장르명을 올바르게 입력해주세요");
            return;
        }
        $.ajax({
            url:"/api/movie/genre?name="+$("#genre_name").val(),
            type:"put",
            success:function(result){
                alert(result.message);
                if(result.status) location.reload();
            }
        })
    })
    $(".modify").click(function(){
        $(".popup_title").html("장르 정보 수정")
        $(".insert_data_area").show();
        $("#save").hide();
        $("#update").show();
        $("#update").attr("data-seq",$(this).attr("data-seq"));
        $.ajax({
            url:"/api/movie/genre/name?seq="+$(this).attr("data-seq"),
            type:"get",
            success:function(result){
                $("#genre_name").val(result.name);
                $(".before").html("변경 전 : "+result.name);
            }
        })
    })
    $(".delete").click(function(){
        if(!confirm("삭제하시겠습니까?")) return;
        $.ajax({
            url:"/api/movie/genre?seq="+$(this).attr("data-seq"),
            type:"delete",
            success:function(result){
                alert(result.message);
                location.reload();
            }
        })
    })
    $("#update").click(function(){
        if(!confirm("변경하시겠습니까?")) return;
        $.ajax({
            url:"/api/movie/genre?seq="+$(this).attr("data-seq")+"&name="+$("#genre_name").val(),
            type:"patch",
            success:function(result){
                alert(result.message);
                if(result.status) location.reload();
            }
        })
    })
    $("#add").click(function(){
        $("#genre_name").val("");   //인풋창에 value값 초기화는 val()
        $(".before").html("");  //속성값 초기화할때는 html()
        $(".popup_title").html("장르 정보 추가")
        $(".insert_data_area").show();
        $("#save").show();
        $("#update").hide();
    })
    $("#cancel").click(function(){
        if(!confirm("취소하시겠습니까?")) return;
        $(".insert_data_area").hide();
        $("#genre_name").val();   //인풋창에 value값 초기화는 val()
        $(".before").html("");  //속성값 초기화할때는 html()
    })
})