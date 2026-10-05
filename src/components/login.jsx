import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './login.css'

const Login = ({ setLoggedInUser }) => {
    //회원정보 수정하기
    const navigate = useNavigate(); // 이제 navigate()사용가능

    const [users,setUsers] =useState(()=> {const savedUsers = localStorage.getItem("users");
                        return savedUsers ? JSON.parse(savedUsers) : [{id:"" , username:"ohj", password:"5122"}]
    })
    const [form, SetForm]= useState({username:"", password:""})
    const [loginForm, SetLoginForm]= useState({username:"", password:""})
    

    const [registerchoice, setRegisterChoice]=useState(false) //이용자 등록을 누를 떄

    const addUser =(e)=>{
        e.preventDefault()
        if (users.some((user)=> form.username===user.username)){ //username을 통해 이미있는 회원인지 판별
            alert("이미 있는 회원입니다")
            SetForm({username:"", password:""})
            return
            }

        if (form.username && form.password){
            const newUser ={...form, id:users.length+1}
            alert("회원가입 완료")
            setUsers([...users,newUser])     
            setRegisterChoice(false)       
        }  
        SetForm({username:"", password:""})
    }

        useEffect(()=>{
            localStorage.setItem("users", JSON.stringify(users)) //users가 바뀔때마다 저장
        },[users])

    const userMatch=(e)=>{ //로그인Form 유저가 users안에 있을때 
        e.preventDefault()
        const matchUser=users.find((user) => user.username === loginForm.username && user.password === loginForm.password)
        
        if (matchUser){ //배열.include(찾고싶은 값)
            alert("로그인 완료")
            setLoggedInUser(matchUser)
            SetLoginForm({username:"", password:""})
            navigate("/dirary_app");

        }
        else{
            alert("로그인 실패")
            SetLoginForm({username:"", password:""})
        }
        
    }


    return (
    
    <div className="diary-container">
        <h2 className="diary-title">일기장</h2>

        

        {registerchoice ? ( //이용자 등록 누를 떄
            <form onSubmit={addUser} className="auth-box register-box">
                <h3 className="auth-title">회원가입</h3>
                <input className="auth-input" type="text"  placeholder='username 입력' onChange={(e)=>SetForm({...form, username:e.target.value})} value={form.username}/><br></br>
                <input className="auth-input" type="password"  placeholder='password 입력' onChange={(e)=>SetForm({...form, password:e.target.value})} value={form.password}/><br></br>
                <div className="auth-buttons">
                    <button type='submit' className="btn btn-primary">회원가입</button><button type="button" className="btn btn-secondary" onClick={()=>setRegisterChoice(false)}>돌아가기</button>
                </div>
            </form>
        ):(
            
            <form onSubmit={userMatch} className="auth-box login-box">
                <h3 className="auth-title">로그인</h3>
                <input className="auth-input" type="text"  placeholder='username 입력' onChange={(e)=>SetLoginForm({...loginForm, username:e.target.value})} value={loginForm.username}/><br></br>
                <input className="auth-input" type="password"  placeholder='password 입력' onChange={(e)=>SetLoginForm({...loginForm, password:e.target.value})} value={loginForm.password}/><br></br>
                    <div className="auth-buttons">
                        <button type ="submit" className="btn btn-primary">로그인</button><button type="button" className="btn btn-secondary" onClick={()=>setRegisterChoice(true)}>이용자 등록</button>
                    </div>
            </form>

        )
        }

        {/*users.map((user)=><p key={user.id}>{user.username}</p>)*/}
    </div>
  )
}

export default Login