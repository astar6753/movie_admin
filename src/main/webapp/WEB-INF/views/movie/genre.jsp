<%@page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script>
        $(function(){
            $(".insert_data").draggable({
                handle:".popup_title"
            })
        })
    </script>
    <script src="/assets/js/movie/genre.js"></script>
    <link rel="stylesheet" href="/assets/css/movie/genre.css">
</head>
<body>
    <main>
        <h1>장르 정보 관리</h1>
        <div class="genre_data_area">
            <div class="genre_header">                
                <button id="add">
                    <i class="fas fa-plus-square"></i>
                    <span>장르 정보 추가</span>
                </button>
            </div>
            <div class="genre_list">
                <c:forEach items="${genreList}" var="item">
                    <div class="genre_item">
                        <p class = "name">${item.genre_name}</p>
                        <p class = "count">
                            <b>${item.genre_count}</b>
                            <span>작품</span>
                        </p>
                        <button class="modify" data-seq="${item.genre_seq}">수정</button>
                        <button class="delete" data-seq="${item.genre_seq}">삭제</button>
                    </div>
                </c:forEach>
            </div>
            <div class="pager_area">
                <c:forEach begin="1" end="${pageCount}" var="i">
                    <a href="/movie/genre?page=${i}" 
                        <c:if test="${page == i}">class="current"</c:if>
                    >${i}</a>
                </c:forEach>
            </div>
        </div>
        <div class="insert_data_area">
            <div class="insert_data">
                <h1 class="popup_title"></h1>
                <div class="content">
                    <p class="before"></p>
                    <input type="text" id="genre_name">
                    <button id="update">수정</button>
                    <button id="save">등록</button>
                    <button id="cancel">&times;</button>
                </div>
            </div>
        </div>
    </main>
</body>
</html>