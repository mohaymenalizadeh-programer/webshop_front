import React, { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import SEO from './SEO.jsx';

export default function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const refId = searchParams.get('ref_id');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!refId) return;
    navigator.clipboard.writeText(refId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div dir="rtl" style={{
      minHeight: '70vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <SEO
        title="پرداخت موفق"
        description="پرداخت شما با موفقیت انجام شد"
        canonical="/payment-success"
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
          background: '#e8f8ee',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px'
        }}>
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
            <path d="M20 6L9 17L4 12" stroke="#27ae60" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <h1 style={{ fontSize: '20px', color: '#2c3e50', marginBottom: '8px' }}>
          پرداخت با موفقیت انجام شد
        </h1>
        <p style={{ fontSize: '14px', color: '#7f8c8d', marginBottom: '20px' }}>
          سفارش شما ثبت شد و به زودی پردازش می‌شود.
        </p>

        {refId && (
          <div style={{
            background: '#f8f9fa',
            border: '1px solid #e5e5e5',
            borderRadius: '10px',
            padding: '12px 16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: '#999' }}>کد پیگیری</div>
              <div style={{ fontSize: '15px', fontWeight: 'bold', color: '#2c3e50' }}>{refId}</div>
            </div>
            <button
              onClick={handleCopy}
              style={{
                fontSize: '12px',
                background: '#fff',
                border: '1px solid #ddd',
                borderRadius: '6px',
                padding: '6px 10px',
                cursor: 'pointer',
                color: '#555'
              }}
            >
              {copied ? 'کپی شد!' : 'کپی کد'}
            </button>
          </div>
        )}

        <Link
          to="/"
          style={{
            display: 'inline-block',
            background: '#27ae60',
            color: '#fff',
            textDecoration: 'none',
            padding: '12px 28px',
            borderRadius: '10px',
            fontSize: '15px',
            fontWeight: 'bold'
          }}
        >
          بازگشت به صفحه اصلی
        </Link>
      </div>
    </div>
  );
}