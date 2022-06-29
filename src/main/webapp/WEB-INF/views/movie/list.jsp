<%@page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>
    <main>
        <a href="/movie/add" id="add_movie_info">영화 정보 추가</a>
        <div class="search_area">
            <c:if test="${country == null}">
                <form action="/movie/list">
                    <input type="text" name="keyword" value="${keyword}">
                    <button type="submit">검색</button>
                </form>
            </c:if>
            <c:if test="${country != null}">
                <form action="/movie/list?country=${country}">
                    <input type="text" name="keyword" value="${keyword}">
                    <button type="submit">검색</button>
                </form>
            </c:if>            
        </div>
        <table>
            <thead>
                <tr>                    
                    <td>번호</td>
                    <td>장르</td>
                    <td>연도</td>
                    <td>국가</td>
                    <td>포스터</td>
                    <td>제목</td>
                    <td>개봉일</td>
                    <td>상영여부</td>
                    <td>관람등급</td>
                    <td>상영시간</td>
                    <td></td>
                </tr>
            </thead>
            <tbody>
                <c:if test="${list.size()==0}">
                    <tr>
                        <td colspan="10">
                            <c:if test="${keyword != null}">"${keyword}"에 해당하는</c:if>
                            영화 정보가 없습니다.
                        </td>
                    </tr>
                </c:if>
                <c:forEach items="${list}" var="item" varStatus="stat">
                    <tr>                    
                        <td>${stat.count}|${item.mi_seq}</td>                        
                        <td>${item.genre_name}</td>
                        <td>${item.mi_year}년</td>
                        <td>${item.mi_country}</td>
                        <td>
                            <div class="poster_img"
                                style="background-image:url('/images/movie/${item.poster_img}');
                                    width:60px; height:80px; background-size: auto 100%;
                                    background-repeat: no-repeat;"
                            ></div>
                        </td>
                        <td>${item.mi_title}</td>
                        <td>
                            <fmt:formatDate value = "${item.mi_opening_dt}" pattern = "yyyy년 MM월 dd일"></fmt:formatDate>
                        </td>
                        <td>
                            <c:choose>
                                <c:when test="${item.mi_showing_status==0}">미개봉</c:when>
                                <c:when test="${item.mi_showing_status==1}">상영중</c:when>
                                <c:when test="${item.mi_showing_status==2}">스트리밍</c:when>
                            </c:choose>
                        </td>
                        <td>
                            <c:if test="${item.mi_viewing_age==0}">전체이용가</c:if>
                            <c:if test="${item.mi_viewing_age!=0}">${item.mi_viewing_age}세 관람가</c:if>
                            <%--<!-- <c:choose>
                                <c:when test="${item.mi_viewing_age==0}">전체이용가</c:when>
                                <c:when test="${item.mi_viewing_age==12}">12세이용가</c:when>
                                <c:when test="${item.mi_viewing_age==15}">15세이용가</c:when>
                                <c:when test="${item.mi_viewing_age==19}">19세이용가</c:when>
                            </c:choose> -->--%> 
                        </td>
                        <td>${item.mi_ruuning_time}분</td>
                        <td>
                            <a href="/movie/detail?movie_no=${item.mi_seq}">상세정보</a>
                        </td>
                    </tr>
                </c:forEach>
            </tbody>            
        </table>
        <div class="pager_area">
            <c:forEach begin="1" end="${pageCount}" var="i">
                <c:if test="${country == null}">
                    <a href="/movie/list?page=${i}&keyword=${keyword}">${i}</a>
                </c:if>
                <c:if test="${country != null}">
                    <a href="/movie/list?page=${i}&keyword=${keyword}&country=${country}">${i}</a>
                </c:if>            
            </c:forEach>
        </div>
    </main>
</body>
</html>