<%@page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/assets/css/reset.css">
    <link rel="stylesheet" href="/assets/css/account/list.css">
    <script src="/assets/js/account/list.js"></script>
    <title>Document</title>
</head>
<body>
    <main>
        <div class="page_header">
            <h1>관리자 계정 관리</h1>
            <form action="/account/list" method="get">
                <input type="text" name="keyword" placeholder="아이디 검색" value="${keyword}">
                <button type="submit">검색</button>
            </form>
            <button id="account_add">관리자 추가</button>
        </div>
        <div class="content_area">
            <table>
                <thead>
                    <tr>
                        <td>순번</td><td>아이디</td><td>사용자 명</td><td>권한등급</td><td></td>
                    </tr>
                </thead>
                <tbody>
                    <c:forEach items="${list}" var="item" varStatus="status">
                        <tr>
                            <td>${status.count}<span>|</span>${item.aai_seq}</td>
                            <td>${item.aai_id}</td>
                            <td>${item.aai_name}</td>
                            <td>
                                <c:if test="${item.aai_role==1}">일반관리자</c:if>
                                <c:if test="${item.aai_role==2}">전체관리자</c:if>
                                <c:if test="${item.aai_role==99}">슈퍼유저</c:if>
                            </td>
                            <td>
                                <button class="modify" data-seq="${item.aai_seq}">수정</button>
                                <button class="delete" data-seq="${item.aai_seq}">삭제</button>
                            </td>
                        </tr>
                    </c:forEach>
                </tbody>
            </table>
        </div>
        <div class="pager_area">
            <c:forEach begin="1" end="${pageCount}" var="i">
                <a href="/account/list?page=${i}&keyword=${keyword}">${i}</a>
            </c:forEach>
        </div>
        <div class="account_add_popup">
            <div class="account_info">
                <h1>관리자 추가</h1>
                <table>
                    <tbody>
	                    <tr>
	                        <td>아이디</td>
	                        <td>
	                            <input type="text" id="aai_id">
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>비밀번호</td>
	                        <td>
	                            <input type="password" id="aai_pwd">
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>이름</td>
	                        <td>
	                            <input type="text" id="aai_name">
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>관리자 유형</td>
	                        <td>
	                            <select id="aai_role">
	                                <option value="1">일반관리자</option>
	                                <option value="2">전체관리자</option>
	                                <option value="99">슈퍼유저</option>
	                            </select>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colspan="2">
	                            <button id="save_account">등록</button>
	                            <button id="save_cancel">취소</button>
	                        </td>
	                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="account_modify_popup">
            <div class="account_info">
                <h1>관리자 수정</h1>
                <table>
                    <tbody>
	                    <tr>
	                        <td>아이디</td>
	                        <td>
	                            <input type="text" id="mod_aai_id">
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>비밀번호</td>
	                        <td>
	                            <input type="password" id="mod_aai_pwd">
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>이름</td>
	                        <td>
	                            <input type="text" id="mod_aai_name">
	                        </td>
	                    </tr>
	                    <tr>
	                        <td>관리자 유형</td>
	                        <td>
	                            <select id="mod_aai_role">
	                                <option value="1">일반관리자</option>
	                                <option value="2">전체관리자</option>
	                                <option value="99">슈퍼유저</option>
	                            </select>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colspan="2">
	                            <button id="mod_account">수정</button>
	                            <button id="mod_cancel">취소</button>
	                        </td>
	                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </main>
</body>
</html>