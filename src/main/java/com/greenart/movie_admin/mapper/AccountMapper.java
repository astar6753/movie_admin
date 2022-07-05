package com.greenart.movie_admin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.greenart.movie_admin.data.account.AdminAccountInfoVO;


@Mapper
public interface AccountMapper {
    public List<AdminAccountInfoVO> selectAdminAccountList(String keyword, Integer offset);
    public Integer selectAdminAccountInfoCnt(String keyword);
    public Integer selectAdminAccountPageCnt(String keyword);
    public void insertAdminAccount(AdminAccountInfoVO data);
    public void updateAdminAccount(AdminAccountInfoVO data);
    public void deleteAdminAccount(Integer seq);
    public AdminAccountInfoVO selectAdminBySeq(Integer seq);
    public AdminAccountInfoVO loginUser(AdminAccountInfoVO data);
}
