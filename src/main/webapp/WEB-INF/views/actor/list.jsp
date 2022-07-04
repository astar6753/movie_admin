<%@page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/actor/list.css">
    <script src="/assets/js/actor/list.js"></script>
    <title>Document</title>
</head>
<body>
    <main>
        <h1>영화 배우 관리</h1>
        <button id="actor_add">배우 정보 추가</button>
        <div class="actor_add_popup">
            <div class="actor_add_box">
                <div class="actor_info">
                    <span>배우 이름</span>
                    <input type="text" id="actor_name" placeholder="배우 이름을 입력하세요(한글)">
                    <span>국적</span>
                    <input type="text" id="actor_country" placeholder="국적을 입력하세요(한글)">
                </div>
                <div class="actor_image_area">
                    <form id="actor_img_form">
                        <input type="file" id="actor_img_file" name="file" hidden accept="image/gif, image/jpeg, image/png">
                        <!-- <button type="button" id="add_img">추가</button> -->
                    </form>
                    <div class="actor_imgs">
                        <div class="img_list">

                        </div>
                        <button id="browse" onclick="document.getElementById('actor_img_file').click()">이미지 선택</button>
                    </div>
                </div>
                <button type="button" id="add_actor">배우정보 추가</button>
                <button type="button" id="close_popup">취소</button>
            </div>
        </div>
        <div class="actor_list_header">
            <div class="country_area">
                <c:if test="${keyword != null}">
                    <a href="/actor/list?keyword=${keyword}"
                        <c:if test="${country == null}">class = "current"</c:if>
                    >전체</a>    
                </c:if>
                <c:if test="${keyword == null}">
                    <a href="/actor/list"
                        <c:if test="${country == null}">class = "current"</c:if>
                    >전체</a>
                </c:if>
                <c:forEach items="${countryURL}" var="item">
                    <a href="${item.url}"
                        <c:if test="${country == item.country}">class = "current"</c:if>
                    >${item.country}</a>
                </c:forEach>
            </div>
            <form action="/actor/list" method="get">
                <input type="text" name="keyword" placeholder="배우 이름 검색" value="${keyword}">
                <button type="submit">검색</button>
            </form>
        </div>        
        <div class="actor_list_wrap">
            <c:forEach items="${list}" var="item">
                <a href="/actor/detail?actor_no=${item.cai_seq}" class="actor_list_item">
                    <div class="actor_img" style="background-image: url('/images/actor/${item.photo}');"></div>
                    <p>
                        <span>${item.cai_name}</span>
                        <span>|</span>
                        <span>${item.cai_country}</span>
                    </p>
                </a>
            </c:forEach>
        </div>
        <div class="pager_area">
            <!-- <%--
            <c:forEach begin="1" end="${pageCount}" var="i">
                <a href="/actor/list?page=${i}">${i}</a>
            </c:forEach>
            --%> -->
            <c:forEach items="${pagerURL}" var="url" varStatus="stat">
                <a href="${url}"
                    <c:if test="${page == stat.count}">class = "current"</c:if>
                >${stat.count}</a>
            </c:forEach>
        </div>
        
    </main>
</body>
</html>