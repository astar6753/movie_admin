$(function(){
    $("#login_btn").click(function(){
        if(isEmpty($("#user_id").val())) {
            $("#user_id+.error").css("display","block");
            $("#user_id").attr("placeholder","아이디를 올바르게 입력하세요");
        }
        else{ $("#user_id+.error").css("display",""); }
        
        if(isEmpty($("#user_pwd").val())) {
            $("#user_pwd+.error").css("display","block");
            $("#user_pwd").attr("placeholder","비밀번호를 올바르게 입력하세요");
        }
        else{ $("#user_pwd+.error").css("display",""); }

        let data = {
            aai_id:$("#user_id").val(),
            aai_pwd:$("#user_pwd").val()
        }
        
        $.ajax({
            url:"/api/account/login",
            type:"post",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(r) {
                alert(r.message+"\n"+r.message2);
                if(r.status){location.href="/summary"}                
            }
        })



    })
})
