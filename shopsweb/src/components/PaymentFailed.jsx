import React from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import SEO from './SEO.jsx';

export default function PaymentFailed() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const navigate = useNavigate();

  return (
    <div dir="rtl" style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <SEO
        title="پرداخت ناموفق"
        description="پرداخت شما انجام نشد"
        canonical="/payment-failed"
        noindex={true}
      />
      <div style={{
        maxWidth: '420px',
        width: '100%',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        padding: '32px 24px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '70px',
          height: '70px',
          borderRadius: '50%',
          background: '#fdecea',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M6 6L18 18M18 6L6 18" stroke="#e74c3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 style={{ fontSize: '20px', color: '#2c3e50', marginBottom: '8px' }}>
          پرداخت انجام نشد
        </h1>
        <p style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: code ? '10px' : '24px' }}>
          تراکنش ناموفق بود یا توسط شما لغو شد. مبلغی از حساب شما کسر نشده است.
        </p>

        {code && (
          <p style={{ fontSize: '12px', color: '#bbb', marginBottom: '24px' }}>
            کد خطا: {code}
          </p>
        )}

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/cartPage')}
            style={{
              background: '#e74c3c',
              color: '#fff',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            تلاش مجدد
          </button>
          <Link
            to="/"
            style={{
              display: 'inline-block',
              background: '#f1f1f1',
              color: '#555',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '10px',
              fontSize: '15px',
              fontWeight: 'bold'
            }}
          >
            صفحه اصلی
          </Link>
        </div>
      </div>
    </div>
  );
}