package com.greenart.movie_admin.mapper;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.history.AdminAccessHistoryVO;



@Mapper
public interface HistoryMapper {
    public void insertAdminHistory(AdminAccessHistoryVO data);
}
