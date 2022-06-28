let movie_imgs = new Array();
let movie_desc_list = new Array();
$(function(){
    $("#movie_img_select").change(function(){
        let form = $("#movie_img_form");
        let formData = new FormData(form[0]);
        if($(this).val() == ''||$(this).val() == null) return;
        $.ajax({
            url:"/images/upload/movie",
            type:"put",
            data:formData,
            contentType:false,
            processData:false,
            success:function(result) {
                if(!result.status) {
                    alert(result.message);
                    return;
                }
                let tag = 
                '<div class="movie_img" filename="'+result.file+'">'
                +'<img src="/images/movie/'+result.file+'">'
                +'<button onclick=deleteImg("'+result.file+'")>&times;</button>'
                +'</div>';
                movie_imgs.push(result.file);
                $(".movie_image_list").append(tag);
            },
            error:function(error) {
                console.log(error);
            }
        })
    });

    $("#desc_img_select").change(function(){
        let form = $("#desc_img_form");
        let formData = new FormData(form[0]);
        if($(this).val() == ''||$(this).val() == null) return;
        $.ajax({
            url:"/images/upload/movie_desc",
            type:"put",
            data:formData,
            contentType:false,
            processData:false,
            success:function(result) {
                if(!result.status) {
                    alert(result.message);
                    return;
                }
                let order = $(".desc_img_box").length + $(".desc_text_box").length+1;
                let tag = 
                '<div class="desc_img_box" filename="'+result.file+'">'
                +'<img src="/images/movie_desc/'+result.file+'">'
                +'<button onclick=deleteDescImg("'+result.file+'")>&times;</button>'
                +'</div>';
                // movie_imgs.push(result.file);
                movie_desc_list.push({type:"img",content:result.file,order:order});
                console.log(movie_desc_list);
                $(".description_list").append(tag);
            },
            error:function(error) {
                console.log(error);
            }
        })
    });

    $("#text_add").click(function(){
        let order = $(".desc_img_box").length + $(".desc_text_box").length+1;
        let tag = 
        '<div class="desc_text_box">'
        +'<textarea cols="30" rows="10" id="text'+order+'" onkeyup=saveDescText('+order+')></textarea>'
        // +'<button class="desc_text_save" onclick="saveDescText('+order+')">저장</button>'
        +'<button class="desc_text_del" onclick="deleteDescText('+order+')">삭제</button>'
        +'</div>';
        movie_desc_list.push({type:"text",content:"",order:order});
        console.log(movie_desc_list);
        $(".description_list").append(tag);
    });
})



function deleteImg(filename){
    if(!confirm("영화 이미지를 삭제하시겠습니까?")) return;
    $.ajax({
        url:"/images/delete/movie/"+filename,
        type:"delete",
        success:function(result) {
            alert(result.message);
            if(result.status) {
                movie_imgs = movie_imgs.filter((img)=>(filename != img))
                $(".movie_image_list").html("");
                for(let i = 0; i<movie_imgs.length; i++){
                    let tag = 
                    '<div class="movie_img" filename="'+movie_imgs[i]+'">'
                    +'<img src="/images/movie/'+movie_imgs[i]+'">'
                    +'<button onclick=deleteImg("'+movie_imgs[i]+'")>&times;</button>'
                    +'</div>';
                    $(".movie_image_list").append(tag);
                }
            }
        }
    })
}
function deleteDescImg(filename){
    if(!confirm("설명 이미지를 삭제하시겠습니까?")) return;
    $.ajax({
        url:"/images/delete/movie_desc/"+filename,
        type:"delete",
        success:function(result) {
            alert(result.message);
            if(result.status) {
                movie_desc_list = movie_desc_list.filter((desc)=>filename != desc.content);
                console.log(movie_desc_list);
                $(".description_list").html("");
                for(let i = 0; i<movie_desc_list.length; i++){
                    //삭제 후 order넘버 재정렬 빠진 번호 제외한 데이터에서 order번호만 for문 속에서 i로 재정렬
                    movie_desc_list[i].order = i+1;
                    let tag = ""
                    if(movie_desc_list[i].type=="img"){
                        tag=
                            '<div class="desc_img_box" filename="'+movie_desc_list[i].content+'">'
                            +'<img src="/images/movie_desc/'+movie_desc_list[i].content+'">'
                            +'<button onclick=deleteDescImg("'+movie_desc_list[i].content+'")>&times;</button>'
                            +'</div>';
                    }
                    if(movie_desc_list[i].type =="text"){
                        tag =
                            '<div class="desc_text_box">'
                            +'<textarea cols="30" rows="10" id="text'+movie_desc_list[i].order+'" onkeyup=saveDescText('+order+')>'+movie_desc_list[i].content+'</textarea>'
                            // +'<button class="desc_text_save" onclick="saveDescText('+movie_desc_list[i].order+')">저장</button>'
                            +'<button class="desc_text_del" onclick="deleteDescText('+movie_desc_list[i].order+')">삭제</button>'
                            +'</div>';
                    }
                    $(".description_list").append(tag);
                }
            }
        }
    })
}
function saveDescText(order){
    // if($("#text"+order).prop("disabled")){        
    //     $("#text"+order+"+button").html("저장");
    //     $("#text"+order).prop("disabled",false);
    // }
    // else{
        movie_desc_list.find(desc=>desc.order == order).content = $("#text"+order).val();
    //     $("#text"+order+"+button").html("수정");
    //     $("#text"+order).prop("disabled",true);
    // }
}
function deleteDescText(order){
    if(!confirm("설명을 삭제하시겠습니까?")) return;
    movie_desc_list = movie_desc_list.filter((desc)=>order != desc.order);
    $(".description_list").html("");
    for(let i = 0; i<movie_desc_list.length; i++){
        //삭제 후 order넘버 재정렬 빠진 번호 제외한 데이터에서 order번호만 for문 속에서 i로 재정렬
        movie_desc_list[i].order = i+1;
        let tag = ""
        if(movie_desc_list[i].type=="img"){
            tag=
                '<div class="desc_img_box" filename="'+movie_desc_list[i].content+'">'
                +'<img src="/images/movie_desc/'+movie_desc_list[i].content+'">'
                +'<button onclick=deleteDescImg("'+movie_desc_list[i].content+'")>&times;</button>'
                +'</div>';
        }
        if(movie_desc_list[i].type =="text"){
            tag =
                '<div class="desc_text_box">'
                +'<textarea cols="30" rows="10" id="text'+movie_desc_list[i].order+'" onkeyup=saveDescText('+order+')>'+movie_desc_list[i].content+'</textarea>'
                // +'<button class="desc_text_save" onclick="saveDescText('+movie_desc_list[i].order+')">저장</button>'
                +'<button class="desc_text_del" onclick="deleteDescText('+movie_desc_list[i].order+')">삭제</button>'
                +'</div>';
        }
        $(".description_list").append(tag);
    }
}