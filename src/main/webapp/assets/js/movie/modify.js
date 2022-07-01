let movie_imgs = new Array();
let movie_desc_list = new Array();
let movie_trailer_list = new Array();

$(function(){
    $("#movie_img_select").change(function(){
        let form = $("#movie_img_form");
        let formData = new FormData(form[0]);
        if($(this).val() == '' || $(this).val() == null) return;
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
                let imgData = {
                    mimg_mi_seq:movie_seq,
                    mimg_file_name:result.file
                }
                $.ajax({
                    url:"/api/movie/add/image",
                    type:"put",
                    contentType:"application/json",
                    data:JSON.stringify(imgData),
                    success:function(r) {
                        console.log(r, result);
                        // alert('<button onclick=deleteImg("'+result.file+'", '+r.seq+')>&times;</button>');
                        let tag = 
                        '<div class="movie_img" filename="'+result.file+'">'
                            +'<img src="/images/movie/'+result.file+'">'
                            // +'<button onclick=\"deleteImg("'+result.file+'", '+r.seq+')\">&times;</button>'
                            +'<button onclick="deleteImg(\''+result.file+'\', '+r.seq+')">&times;</button>'
                        +'</div>';
                        movie_imgs.push({seq:r.seq, filename:result.file});
                        $(".movie_image_list").append(tag);
                        $("#movie_img_select").val("")
                    }
                })
            },
            error:function(error) {
                console.log(error);
            }
        })
    });
    $("#desc_img_select").change(function(){
        let form = $("#desc_img_form");
        let formData = new FormData(form[0]);
        if($(this).val() == '' || $(this).val() == null) return;
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
                let order = $(".desc_img_box").length + $(".desc_text_box").length + 1;
                let tag = 
                '<div class="desc_img_box" filename="'+result.file+'">'
                    +'<img src="/images/movie_desc/'+result.file+'">'
                    +'<button onclick=deleteDescImg("'+result.file+'")>&times;</button>'
                +'</div>';
                movie_desc_list.push({type:"img", content:result.file, order:order});
                console.log(movie_desc_list);
                $(".description_list").append(tag);
            },
            error:function(error) {
                console.log(error);
            }
        })
    });
    $("#text_add").click(function(){
        let order = $(".desc_img_box").length + $(".desc_text_box").length + 1;
        let tag = 
            '<div class="desc_text_box">'
                +'<textarea cols="30" rows="10" id="text'+order+'" onkeyup=saveDescText('+order+')></textarea>'
                // +'<button class="desc_text_save" onclick=saveDescText('+order+')>저장</button>'
                +'<button class="desc_text_del" onclick=deleteDescText('+order+')>삭제</button>'
            +'</div>';
        movie_desc_list.push({type:"text", content:"", order:order});
        console.log(movie_desc_list);
        $(".description_list").append(tag);
    });
    $("#trailer_select").change(function(){
        let form = $("#trailer_form");
        let formData = new FormData(form[0]);
        if($(this).val() == '' || $(this).val() == null) return;
        $.ajax({
            url:"/movies/upload/movie_trailer",
            type:"put",
            data:formData,
            contentType:false,
            processData:false,
            success:function(result) {
                let trailerData = {
                    tvi_mi_seq:movie_seq,
                    tvi_order:0,
                    tvi_file_name:result.file
                }
                $.ajax({
                    url:"/api/movie/add/trailer",
                    type:"put",
                    contentType:"application/json",
                    data:JSON.stringify(trailerData),
                    success:function(r) {
                        let trailer_order = $("#trailer_file_table tbody tr").length+1;
                        let split = $("#trailer_select").val().split("\\");
                        split = split[split.length-1].split(".");
                        movie_trailer_list.push(
                            {
                                seq:r.seq,
                                order:trailer_order,
                                file:result.file,
                                ext:result.ext,
                                fileSize:result.fileSize,
                                originFileName:split[0]
                            }
                        );
                        let tag = 
                        '<tr>'
                            +'<td>'+($("#trailer_file_table tbody tr").length+1)+'</td>'
                            +'<td>'+split[0]+'</td>'
                            +'<td>'+result.ext+'</td>'
                            +'<td>'+(result.fileSize/1024/1024).toLocaleString()+'MB</td>'
                            +'<td>'
                                +'<button class="delete_trailer" onclick=deleteTrailer(\''+result.file+'\','+r.seq+')>삭제</button>'
                            +'</td>'
                        +'</tr>';
                        $("#trailer_file_table tbody").append(tag);
                        $("#trailer_select").val("")
                    }
                })

                
            }
        })
    })
})
function deleteTrailer(filename, seq) {
    
    if(!confirm("해당 트레일러 영상을 삭제하시겠습니까?\n(❗주의 : 삭제된 데이터는 되돌릴 수 없습니다.)")){
        return;
    }

    $.ajax({
        url:"/movies/delete/movie_trailer/"+filename,
        type:"delete",
        success:function(result){
            // console.log(result);
            movie_trailer_list = movie_trailer_list.filter((data) => data.file != filename);
            $("#trailer_file_table tbody").html("");
            for(let i=0; i<movie_trailer_list.length; i++) {
                movie_trailer_list[i].order = i+1;
                let tag = 
                    '<tr>'
                        +'<td>'+(i+1)+'</td>'
                        +'<td>'+movie_trailer_list[i].originFileName+'</td>'
                        +'<td>'+movie_trailer_list[i].ext+'</td>'
                        +'<td>'+(movie_trailer_list[i].fileSize/1024/1024).toLocaleString()+'MB</td>'
                        +'<td>'
                            // +'<button class="delete_trailer" onclick=deleteTrailer("'+movie_trailer_list[i].file+'")>삭제</button>'
                            +'<button class="delete_trailer" onclick="deleteTrailer(\''+movie_trailer_list[i].file+'\','+movie_trailer_list[i].seq+')">삭제</button>'
                        +'</td>'
                    +'</tr>';
                $("#trailer_file_table tbody").append(tag);
            }
            $.ajax({
                url:"/api/movie/delete/trailer?seq="+seq,
                type:"delete",
                success:function(r) {
                    console.log(r);
                    alert(r.message);
                }
            })
        }
    });
}
function deleteImg(filename, seq){
    if(!confirm("해당 영화 이미지를 삭제하시겠습니까?\n(❗주의 : 삭제된 데이터는 되돌릴 수 없습니다.)")){
        return;
    }
    $.ajax({
        url:"/images/delete/movie/"+filename,
        type:"delete",
        success:function(result) {
            // alert(result.message);
            if(result.status) {
                movie_imgs = movie_imgs.filter((img)=>filename != img.filename);
                $(".movie_image_list").html("");
                for(let i=0; i<movie_imgs.length; i++) {
                    let tag = 
                        '<div class="movie_img" filename="'+movie_imgs[i].filename+'","'+movie_imgs[i].seq+'">'
                            +'<img src="/images/movie/'+movie_imgs[i].filename+'","'+movie_imgs[i].seq+'">'
                            +'<button onclick="deleteImg(\''+movie_imgs[i].filename+'\', '+movie_imgs[i].seq+')">&times;</button>'
                            // +'<button onclick=deleteImg("'+movie_imgs[i].filename+'","'+movie_imgs[i].seq+'")>&times;</button>'
                        +'</div>';
                    $(".movie_image_list").append(tag);
                }
            }
            $.ajax({
                url:"/api/movie/delete/movie_img?seq="+seq,
                type:"delete",
                success:function(r) {
                    alert(r.message);
                }
            })
        }
    })

}
function deleteDescImg(filename, seq){
    if(!confirm("해당 스토리 이미지를 삭제하시겠습니까?\n(❗주의 : 삭제된 데이터는 되돌릴 수 없습니다.)")){
        return;
    }
    $.ajax({
        url:"/images/delete/movie_desc/"+filename,
        type:"delete",
        success:function(result) {
            alert(result.message);
            if(result.status) {
                movie_desc_list = movie_desc_list.filter((desc) => filename != desc.content);
                $(".description_list").html("");
                for(let i=0; i<movie_desc_list.length; i++) {
                    movie_desc_list[i].order = i+1;
                    let tag = ""
                    if(movie_desc_list[i].type == "img"){
                        tag = 
                            '<div class="desc_img_box" filename="'+movie_desc_list[i].content+'">'
                                +'<img src="/images/movie_desc/'+movie_desc_list[i].content+'">'
                                +'<button onclick=deleteDescImg("'+movie_desc_list[i].content+'")>&times;</button>'
                            +'</div>';
                    }
                    if(movie_desc_list[i].type == "text"){
                        tag = '<div class="desc_text_box">'+
                            +'<textarea cols="30" rows="10" id="text'+movie_desc_list[i].order+'" onkeyup=saveDescText('+movie_desc_list[i].order+')>'+movie_desc_list[i].content+'</textarea>'
                            // +'<button class="desc_text_save" onclick=saveDescText('+movie_desc_list[i].order+')>저장</button>
                            +'<button class="desc_text_del" onclick=deleteDescText('+movie_desc_list[i].order+')>삭제</button>'
                            +'</div>';
                    }
                    $(".description_list").append(tag);
                }
            }
        }
    })
}
function saveDescText(order){
    // if($("#text"+order).prop("disabled")) {
    //     $("#text"+order+"+button").html("저장");
    //     $("#text"+order).prop("disabled", false);
    // }
    // else {
        movie_desc_list.find(desc => desc.order == order).content = $("#text"+order).val();
        // $("#text"+order+"+button").html("수정");
        // $("#text"+order).prop("disabled", true);
    // }
}
function deleteDescText(order, seq){
    if(!confirm("해당 스토리 텍스트를 삭제하시겠습니까?\n(❗주의 : 삭제된 데이터는 되돌릴 수 없습니다.)")){
        return;
    }
    
    movie_desc_list = movie_desc_list.filter((desc) => order != desc.order);
    $(".description_list").html("");
    for(let i=0; i<movie_desc_list.length; i++) {
        movie_desc_list[i].order = i+1;
        let tag = ""
        if(movie_desc_list[i].type == "img"){
            tag = 
                '<div class="desc_img_box" filename="'+movie_desc_list[i].content+'">'
                    +'<img src="/images/movie_desc/'+movie_desc_list[i].content+'">'
                    +'<button onclick=deleteDescImg("'+movie_desc_list[i].content+'")>&times;</button>'
                +'</div>';
        }
        if(movie_desc_list[i].type == "text"){
            tag =
                '<div class="desc_text_box">'
                    +'<textarea cols="30" rows="10" id="text'+movie_desc_list[i].order+'" onkeyup=saveDescText('+movie_desc_list[i].order+')>'+movie_desc_list[i].content+'</textarea>'
                    // +'<button class="desc_text_save" onclick=saveDescText('+movie_desc_list[i].order+')>저장</button>'
                    +'<button class="desc_text_del" onclick=deleteDescText('+movie_desc_list[i].order+')>삭제</button>'
                +'</div>';
        }
        $(".description_list").append(tag);
    }

}