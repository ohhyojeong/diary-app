import React from 'react'

export const DiaryList = ({diarys, onDetail, onEdit, onDelete, onWrite, onLogout}) => {
  
  
    return (
    <div className="auth-box diary-list-box">
    <h3 className="auth-title">내 일기 목록</h3>

    <ul className="diary-list">
    {diarys.map((diary) => (
        <li key={diary.id} className="diary-item">
        <div className="diary-item-info" onClick={() => onDetail(diary)}>
            <span className="diary-item-title">{diary.title}</span>
            <span className="diary-item-date">{diary.date}</span>
        </div>
        <div className="diary-item-actions">
            <button className="btn-small" onClick={() => onEdit(diary)}>수정</button>
            <button className="btn-small btn-danger" onClick={() => onDelete(diary.id)}>삭제</button>
        </div>
        </li>
    ))
    }
    </ul>
    {diarys.length === 0 && <p>작성한 일기가 없어요</p>}
    <div className='auth-buttons'>
        <button className='btn btn-primary' onClick={onWrite}>새 일기쓰기</button>
        <button className="btn btn-secondary" onClick={onLogout}>로그아웃</button>
    </div>
    </div>
  )
}
