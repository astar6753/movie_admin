
$(function(){
    $("#account_add").click(function(){
        $(".account_add_popup").show();
    })

    $("#save_cancel").click(function(){
        if(!confirm("취소하시겠습니까?\n입력된 정보는 저장되지 않습니다.")) return;
        
        $(".account_add_popup").hide();
        $("#aai_id").val("");
        $("#aai_pwd").val("");
        $("#aai_name").val("");
        $("#aai_role").val(1).prop("selected",true);

    })

    $("#save_account").click(function(){
        let id = $("#aai_id").val();
        let pwd = $("#aai_pwd").val();
        let name = $("#aai_name").val();
        if(isEmpty(id)){alert("아이디를 올바르게 입력하세요"); return;}
        if(isEmpty(pwd)){alert("비밀번호를 올바르게 입력하세요"); return;}
        if(isEmpty(name, false)){alert("이름을 올바르게 입력하세요"); return;}

        let data = {
            aai_id:id,
            aai_pwd:pwd,
            aai_name:name,
            aai_role:$("#aai_role option:selected").val()
        }

        $.ajax({
            url:"/api/account/add",
            type:"put",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(r) {
                alert(r.message);
                location.reload();
            },
            error:function(err) {
                alert(err.responseJSON.message);
            }
        })
    })

    $(".delete").click(function(){
        if(!confirm("관리자 정보를 삭제하시겠습니까?")) return;
        let seq = $(this).attr("data-seq");
        $.ajax({
            url:"/api/account/delete?seq="+seq,
            type:"delete",
            success:function(r) {
                alert(r.message);
                location.reload();
            }
        })
    })

    $(".modify").click(function(){
        $("#mod_aai_id").prop("disabled",true);

        let seq = $(this).attr("data-seq");
        $.ajax({
            url:"/api/account/select_one?seq="+seq,
            type:"get",
            success:function(r) {
                $(".account_modify_popup").show();
                $("#mod_aai_id").val(r.aai_id);
                $("#mod_aai_name").val(r.aai_name);
                $("#mod_aai_role").val(r.aai_role).prop("selected",true);
                $("#mod_account").attr("data-seq",r.aai_seq);
            }
        })
    })

    $("#mod_account").click(function(){
        let id = $("#mod_aai_id").val();
        let pwd = $("#mod_aai_pwd").val();
        let name = $("#mod_aai_name").val();
        if(isEmpty(id)){alert("아이디를 올바르게 입력하세요"); return;}
        if(isEmpty(pwd)){alert("비밀번호를 올바르게 입력하세요"); return;}
        if(isEmpty(name, false)){alert("이름을 올바르게 입력하세요"); return;}
        
        let data = {
            aai_seq:$(this).attr("data-seq"),
            aai_id:id,
            aai_pwd:pwd,
            aai_name:name,
            aai_role:$("#mod_aai_role option:selected").val()
        }

        $.ajax({
            url:"/api/account/patch",
            type:"patch",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(r) {
                alert(r.message);
                location.reload();
            },
            error:function(err) {
                alert(err.responseJSON.message);
            }
        })
    })

    $("#mod_cancel").click(function(){
        if(!confirm("취소하시겠습니까?\n입력된 정보는 저장되지 않습니다.")) return;
        
        $(".account_modify_popup").hide();
        $("#mod_aai_id").val("");
        $("#mod_aai_pwd").val("");
        $("#mod_aai_name").val("");
        $("#mod_aai_role").val(1).prop("selected",true);        
        $("#mod_account").attr("data-seq",null);
    })
})