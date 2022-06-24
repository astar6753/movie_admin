<%@page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="/assets/js/common/util.js"></script>
    <script src="/assets/js/movie/genre.js"></script>
    <title>Document</title>
    <link rel="stylesheet" href="/assets/css//movie/genre.css">
</head>
<body>
    <main>
        <h1>장르정보관리</h1>
        <div class="genre_data_area">
            <div class="genre_header">
                <button id="add">장르 정보 추가</button>
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
                    <a href="/movie/genre?page=${i}">${i}</a>
                </c:forEach>
            </div>
        </div>
        <div class="insert_data_area">
            <div class="insert_data">
                <h1 class="popup_title"></h1>
                <p class="before"></p>
                <input type="text" id="genre_name">
                <button id="update">수정</button>
                <button id="save">등록</button>
                <button id="cancel">취소</button>
            </div>
        </div>
    </main>
</body>
</html>