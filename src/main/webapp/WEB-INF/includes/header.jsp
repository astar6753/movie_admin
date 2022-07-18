<%@page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn"%>
<%
    response.setHeader("Cache-Control", "no-store");
    response.setHeader("Pragma", "no-cache");
    response.setDateHeader("Expires", 0);
%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/header.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css"
        integrity="sha384-DyZ88mC6Up2uqS4h/KRgHuoeGwBcD4Ng9SiP4dIRy0EXTlnuz47vAwmeGwVChigm" crossorigin="anonymous"/>
    <script src="http://code.jquery.com/jquery-3.4.1.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js" integrity="sha512-uto9mlQzrs59VwILcLiRYeLKPPbS/bT71da/OEBYEwcdNUk8jYIy+D176RYoop1Da+f9mvkYrmj5MCLZWEtQuA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.css" integrity="sha512-aOG0c6nPNzGk+5zjwyJaoRUgCdOrfSDhmMID2u4+OIslr0GjpLKo7Xm0Ao3xmpM4T8AmIouRkqwj1nrdVsLKEQ==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.structure.min.css" integrity="sha512-oM24YOsgj1yCDHwW895ZtK7zoDQgscnwkCLXcPUNsTRwoW1T1nDIuwkZq/O6oLYjpuz4DfEDr02Pguu68r4/3w==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.theme.min.css" integrity="sha512-9h7XRlUeUwcHUf9bNiWSTO9ovOWFELxTlViP801e5BbwNJ5ir9ua6L20tEroWZdm+HFBAWBLx2qH4l4QHHlRyg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <script src="/assets/js/common/util.js"></script>
    <title>Document</title>
    <script>
        $(function(){
            let pageURL = location.href;
            let pageURLSplit = pageURL.split("/");
            console.log(pageURLSplit);
            let realURL = "/";
            for(let i=3; i<pageURLSplit.length; i++) {
                realURL += pageURLSplit[i]
                if(i != pageURLSplit.length-1) realURL += "/";
            }
            realURL = realURL.split("?")[0];
            if(realURL == '/admin/list') {
                $(".admin_list").addClass("current")
            }
            if(realURL == '/admin/history') {
                $(".admin_history").addClass("current")
            }
            if(realURL == '/movie/genre') {
                $(".movie_genre").addClass("current")
            }
            if(realURL == '/actor/list') {
                $(".actor_list").addClass("current")
            }
            if(realURL == '/movie/list' || realURL == '/movie/add' || realURL == '/movie/detail') {
                $(".movie_list").addClass("current")
            }
            if(realURL == '/actor/movie_role') {
                $(".movie_role").addClass("current")
            }
        })
    </script>
</head>
<body>
    <header>
        <div class="header_links">
            <a class="admin_list" href="/account/list">관리자 계정 목록</a>
            <a class="admin_history" href="/account/history">관리자 접속 기록</a>
            <a class="movie_genre" href="/movie/genre">장르 정보 관리</a>
            <a class="actor_list" href="/actor/list">배우 정보 관리</a>
            <a class="movie_list" href="/movie/list">영화 정보 관리</a>
            <a class="movie_role" href="/actor/movie_role">영화 배역 정보 관리</a>
        </div>
        <div class="user_info">
            <span>${loginUser.aai_name}(${loginUser.aai_id})</span>
            <a href="/account/logout">로그아웃</a>
        </div>
    </header>
</body>
</html>