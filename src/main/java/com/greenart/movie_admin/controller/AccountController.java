package com.greenart.movie_admin.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.Nullable;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.greenart.movie_admin.mapper.AccountMapper;

@Controller
@RequestMapping("/account")
public class AccountController {
    @Autowired AccountMapper account_mapper;
    @GetMapping("/list")
    public String getAccountList(Model model, @RequestParam @Nullable String keyword, @RequestParam @Nullable Integer page) {
        
        if(page==null) page=1;
        model.addAttribute("list",account_mapper.selectAdminAccountList(keyword,(page-1)*10));
        model.addAttribute("pageCount",account_mapper.selectAdminAccountPageCnt(keyword));
                
        return "/account/list";
    }

    @GetMapping("/logout")
    public String getAccountLogout(HttpSession session) {
        session.invalidate();
        return "redirect:/";
    }
}
