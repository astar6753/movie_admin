<%@page language ="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/includes/header.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="/assets/js/movie/add.js"></script>
    <link rel="stylesheet" href="/assets/css/movie/form.css">
</head>
<body>
    <main>
        <h1>영화 정보 <span class="type">추가</span></h1>
        <div class="basic_info">
            <h1>영화 기본 정보</h1>
            <table>
                <tr>
                    <td>장르</td>
                    <td>
                        <select id="genre_info">
                            <c:forEach items ="${genreList}" var="genre">
                                <option value="${genre.genre_seq}">${genre.genre_name}</option>
                            </c:forEach>
                        </select>
                    </td>
                    <td>제목</td>
                    <td>
                        <input type="text" id="movie_name">
                    </td>
                    <td>관람연령</td>
                    <td>
                        <select id="viewing_age">
                            <option value="0">전체관람가</option>
                            <option value="12">12세 이상</option>
                            <option value="15">15세 이상</option>
                            <option value="19">19세 이상</option>
                        </select>
                    </td>
                    <td>상영시간</td>
                    <td>
                        <input type="text" id="running_time"><span>분</span>
                    </td>
                </tr>
                <tr>
                    <td>국가</td>
                    <td>
                        <input type="text" id="movie_country">
                    </td>
                    <td>개봉일</td>
                    <td>
                        <input type="text" id="opening_dt">
                    </td>
                    <td>상영여부</td>
                    <td>
                        <select id="movie_status">
                            <option value="0">미개봉</option>
                            <option value="1">상영중</option>
                            <option value="2">스트리밍</option>
                        </select>
                    </td>
                    <td>연도</td>
                    <td>
                        <input type="text" id="movie_year">
                    </td>
                </tr>
            </table>
        </div>
        <div class="movie_image_area">
            <h1>영화 이미지 추가</h1>
            <div class="movie_image_list_wrap">
                <form id="movie_img_form">
                    <input type="file" id="movie_img_select" name="file" hidden accept="image/gif, image/jpeg, image/png">
                </form>
                <div class="movie_image_list">
                </div>
                <button id="add_image" onclick="document.getElementById('movie_img_select').click()">이미지 추가</button>
            </div>
        </div>
        <div class="movie_trailer_area">
            <h1>영화 트레일러 영상 추가</h1>
            <div class="movie_trailer_list_wrap">
                <form id="trailer_form">
                    <input type="file" id="trailer_select" name="file" accept="video/mp4" hidden>
                </form>
                <button id="trailer_file_add" onclick="document.getElementById('trailer_select').click()">트레일러 영상 추가</button>
                <table id="trailer_file_table">
                    <thead>
                        <tr>
                            <td>순번</td>
                            <td>영상 파일 이름</td>
                            <td>파일유형</td>
                            <td>파일크기</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        <!-- <%-- <tr>
                            <td>1</td>
                            <td>movie_trailer_alpskfwpojkfw.mp4</td>
                            <td>mp4</td>
                            <td>1234564789byte</td>
                            <td>
                                <button class="delete_trailer">삭제</button>
                            </td>
                        </tr> --%> -->
                    </tbody>
                </table>
            </div>
        </div>
        <div class="movie_description_area">
            <h1>영화 스토리 콘텐츠 추가</h1>
            <form id="desc_img_form">
                <input type="file" name="file" id="desc_img_select" hidden accept="image/gif, image/jpeg, image/png">
            </form>
            <button id="img_add" onclick="document.getElementById('desc_img_select').click()">이미지 추가</button>
            <button id="text_add">설명 추가</button>
            <div class="description_list">
                <!-- <%-- <div class="desc_img_box">
                    <img src="http://placekitten.com/960/540">
                    <button class="desc_img_del">삭제</button>
                </div> --%>
                <%-- <div class="desc_text_box">
                    <textarea cols="30" rows="10"></textarea>
                    <button class="desc_text_save">저장</button>
                    <button class="desc_text_del">삭제</button>
                </div> --%> -->
            </div> 
        </div>
        <div class="button_area">
            <button id="save">저장</button>
            <button id="cancel">취소</button>
        </div>
    </main>
</body>
</html>