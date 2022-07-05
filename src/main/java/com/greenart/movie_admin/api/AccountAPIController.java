package com.greenart.movie_admin.api;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.Nullable;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.greenart.movie_admin.data.account.AdminAccountInfoVO;
import com.greenart.movie_admin.mapper.AccountMapper;
import com.greenart.movie_admin.utils.AESAlgorithm;

@RestController
@RequestMapping("/api/account")
public class AccountAPIController {
    @Autowired AccountMapper account_mapper;    
    @PutMapping("/add")
    public ResponseEntity<Map<String,Object>> addAccountInfo(@RequestBody AdminAccountInfoVO data) throws Exception {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();
        data.setAai_pwd(AESAlgorithm.Encrypt(data.getAai_pwd()));
        try {
            account_mapper.insertAdminAccount(data);    
        } catch (DuplicateKeyException e) {
            resultMap.put("status",false);
            resultMap.put("message",data.getAai_id()+"은(는) 이미 등록된 아이디입니다.");
            return new ResponseEntity<Map<String,Object>>(resultMap,HttpStatus.BAD_REQUEST);
        }
        
        resultMap.put("status",true);
        resultMap.put("message","계정 정보를 추가했습니다.");

        return new ResponseEntity<Map<String,Object>>(resultMap,HttpStatus.OK);
    }
    @PatchMapping("/patch")
    public ResponseEntity<Map<String,Object>> patchAccountInfo(@RequestBody AdminAccountInfoVO data) throws Exception {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();
        if(data.getAai_seq()==null){
            resultMap.put("status",false);
            resultMap.put("message","사용자 번호가 입력되지 않음.");
            return new ResponseEntity<Map<String,Object>>(resultMap,HttpStatus.BAD_REQUEST);
        }
        if(data.getAai_pwd()==null||data.getAai_pwd().equals("")){
            resultMap.put("status",false);
            resultMap.put("message","비밀번호는 공백을 허용하지 않습니다.");
            return new ResponseEntity<Map<String,Object>>(resultMap,HttpStatus.BAD_REQUEST);
        }
        if(data.getAai_name()==null||data.getAai_name().equals("")){
            resultMap.put("status",false);
            resultMap.put("message","이름은 공백을 허용하지 않습니다.");
            return new ResponseEntity<Map<String,Object>>(resultMap,HttpStatus.BAD_REQUEST);
        }
        if(data.getAai_role()==null){
            resultMap.put("status",false);
            resultMap.put("message","계정 유형을 입력하지 않음.");
            return new ResponseEntity<Map<String,Object>>(resultMap,HttpStatus.BAD_REQUEST);
        }
        data.setAai_pwd(AESAlgorithm.Encrypt(data.getAai_pwd()));
        account_mapper.updateAdminAccount(data);

        resultMap.put("status",true);
        resultMap.put("message","계정 정보를 수정했습니다.");
        return new ResponseEntity<Map<String,Object>>(resultMap,HttpStatus.OK);
    }
    @DeleteMapping("/delete")
    public Map<String,Object> deleteAccountInfo(@RequestParam Integer seq) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();

        account_mapper.deleteAdminAccount(seq);
        
        resultMap.put("status",true);
        resultMap.put("message","관리자 정보를 삭제했습니다.");

        return resultMap;
    }
    
    @GetMapping("/list")
    public Map<String,Object> getAccountList(@RequestParam @Nullable String keyword, @RequestParam Integer page) {
        Map<String,Object> resultMap = new LinkedHashMap<String, Object>();

        if(page<=0) page=1;
        

        resultMap.put("keyword", keyword);
        resultMap.put("currentPage", page);
        resultMap.put("totalPage",account_mapper.selectAdminAccountPageCnt(keyword));
        resultMap.put("totalCnt",account_mapper.selectAdminAccountInfoCnt(keyword));
        resultMap.put("accounts",account_mapper.selectAdminAccountList(keyword,(page-1)*10));
                
        return resultMap;
    }

    @GetMapping("/select_one")
    public AdminAccountInfoVO getAccountOne(@RequestParam Integer seq) {
        return account_mapper.selectAdminBySeq(seq);
    }

}

