let actor_keyword = '';

$(function() {
    $("#actor_list_close").click(function(){ $(".actor_role_list_popup").hide(); });
    $(".modify").click(function() {
        $(".actor_role_list_popup").show();
        let seq = $(this).attr("data-seq");
        let title = $(this).attr("data-title");
        $("#actor_role_save").attr("data-seq",seq);
        $(".actor_role_list h2").html(title);
        $.ajax({
            url:"/api/actor/actor_role?seq="+seq,
            type:"get",
            success:function(r) {
                $(".actors").html("");
                for(let i=0; i<r.list.length; i++) {
                    let tag = 
                        '<div class="actor_info">'+
                            '<img src="/images/actor/'+r.list[i].cap_file_name+'">'+
                            '<p>'+(r.list[i].maci_role==1?"주연":"조연")+'</p>'+
                            '<p>'+
                                '<span>'+r.list[i].maci_casting_name+'</span><span> 역</span><span class="sep">|</span><span>'+r.list[i].cai_name+'</span>'+
                            '</p>'+
                            '<button class="actor_role_modify" data-role="'+r.list[i].maci_role+'" data-actor-name="'+r.list[i].cai_name+'" data-casting-name="'+r.list[i].maci_casting_name+'" data-seq="'+r.list[i].maci_seq+'">수정</button>'+
                            '<button class="actor_role_delete" data-seq="'+r.list[i].maci_seq+'">삭제</button>'+
                        '</div>'
                    $(".actors").append(tag);
                }
                $(".actor_role_modify").click(function() {
                    // let actor_name = $(this).attr("data-actor-name");
                    // let seq = $(this).attr("data-seq")
                    // let casting_name = $(this).attr("data-casting-name");
                    // let role = $(this).attr("data-role");
                    // $("#actor_mod_name").val(actor_name);
                    // $("#actor_mod_name").attr("data-seq",seq);
                    // $("#actor_mod_role_name").val(casting_name);
                    // $("#mod_role"+role).attr("checked",true);
                    //0704 8줄>4줄 축약
                    $("#actor_mod_name").val($(this).attr("data-actor-name"));
                    $("#actor_mod_name").attr("data-seq",$(this).attr("data-seq"));
                    $("#actor_mod_role_name").val($(this).attr("data-casting-name"));
                    $("#mod_role"+$(this).attr("data-role")).attr("checked",true);
                    //0704 8줄>4줄 축약
                    $("#actor_mod_name").prop("disabled",true);
                    $(".actor_mod_popup").show();
                })
                $(".actor_role_delete").click(function() {
                    if(!confirm("배역 정보를 삭제하시겠습니까?\n(이 작업은 되돌릴 수 없습니다.)"))return;
                    let seq = $(this).attr("data-seq");
                    $.ajax({
                        url:"/api/actor/actor_role?seq="+seq,
                        type:"delete",
                        success:function(r) {
                            alert(r.message);
                            location.reload();
                        }
                    })
                })
            }
        })
    })
    $("#actor_add").click(function() {
        $(".actor_add_popup").show();
    })
    $("#actor_role_cancel").click(function() {
        $(".actor_add_popup").hide();
    })
    $("#actor_name").click(function() {
        $(".actor_search_popup").show();
        getActorList('','');
    })
    $("#actor_search_button").click(function() {
        actor_keyword = $("#actor_search_keyword").val();
        getActorList(actor_keyword,'');
    })
    $("#actor_role_save").click(function(){
        let data = {
            maci_cai_seq:$("#actor_name").attr("data-seq"),
            maci_mi_seq:$(this).attr("data-seq"),
            maci_casting_name:$("#actor_role_name").val(),
            maci_role:$(".role_type:checked").val()
        }
        console.log(JSON.stringify(data));
        $.ajax({
            url:"/api/actor/actor_role/add",
            type:"put",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(r) {
                alert(r.message);
                location.reload();
            }
        })
    })
    $("#actor_role_cancel").click(function() {
        if(!confirm("배역 정보 추가를 취소하시겠습니까?\n(입력된 정보는 저장되지 않습니다.)"))return;
        $(".actor_add_popup").hide();
        $(".actor_name").val("");
        $(".actor_name").attr("data-seq",null);
        $(".actor_role_name").val("");
        $("#role2").prop("checked",true);
    })
    
    $("#actor_mod_role_cancel").click(function() {
        if(!confirm("배역 정보 수정을 취소하시겠습니까?\n(입력된 정보는 저장되지 않습니다.)"))return;
        $(".actor_mod_popup").hide();

        $("#actor_mod_name").attr("data-seq","");
        $("#actor_mod_name").val("");
        $("#actor_mod_role_name").val("");
        $("#mod_role2").attr("checked",true);

        // $("#actor_mod_name").prop("disabled",true);
    })
    $("#actor_mod_role_save").click(function() {
        let data = {
            maci_seq:$("#actor_mod_name").attr("data-seq"),
            maci_casting_name:$("#actor_mod_role_name").val(),
            maci_role:$(".role_mod_type:checked").val()
        }
        $.ajax({
            url:"/api/actor/actor_role",
            type:"patch",
            contentType:"application/json",
            data:JSON.stringify(data),
            success:function(r) {
                alert(r.message);
                location.reload();
            }
        })
    })
})

function getActorList(keyword, page) {
    $.ajax({
        url:"/api/actor/actor_list?keyword="+keyword+"&page="+page,
        type:"get",
        success:function(r) {
            $(".actor_search_list tbody").html("");
            for(let i=0;i<r.list.length;i++) {
                let tag=
                '<tr>'
                    +'<td>'
                        +'<img width="60" src="/images/actor/'+r.list[i].photo+'">'
                    +'</td>'
                    +'<td>'+r.list[i].cai_name+'</td>'
                    +'<td>'+r.list[i].cai_country+'</td>'
                    +'<td>'
                        +'<button class="actor_select" data-seq="'+r.list[i].cai_seq+'" data-name="'+r.list[i].cai_name+'">선택</button>'
                    +'</td>'
                +'</tr>;'
                $(".actor_search_list tbody").append(tag);
            }

            $(".actor_search_pager_area").html("");
            for(let i=0;i<r.pageCount;i++) {
                let tag='<button class="actor_pager">'+(i+1)+'</button>'
                $(".actor_search_pager_area").append(tag);                
            }
            $(".actor_pager").click(function(){
                let page = $(this).html();
                getActorList(actor_keyword,page);
            })

            $(".actor_select").click(function(){
                let name = $(this).attr("data-name");
                let seq = $(this).attr("data-seq");
                $("#actor_name").val(name);
                $("#actor_name").attr("data-seq",seq);
                
                actor_keyword = "";
                $("#actor_search_keyword").val("");

                $(".actor_search_popup").hide();
            })
        }
    })
}