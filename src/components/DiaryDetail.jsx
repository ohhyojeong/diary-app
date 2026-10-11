import React from 'react'

export const DiaryDetail = ({diary, onBack}) => {
    if (!diary) return null;
    return (
        <div className="auth-box diary-detail-box">
            {/* detail 모드일 때 */}
            <h3 className="diary-detail-title">{diary.title}</h3>
            <p className="diary-date">{diary.date}</p>
            <p className="diary-detail-content">{diary.content}</p>

            <div className="auth-buttons">
            <button className="btn btn-secondary" onClick={onBack}>목록보기</button>
            </div>
        </div>
    )
}
