export function getErrorMessage(error: any): string {
  if (!error) return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  
  const msg = typeof error === 'string' ? error : error.message || '';
  const code = error.code || '';

  const lowerMsg = msg.toLowerCase();
  
  // 권한 오류 (RLS)
  if (code === '42501' || lowerMsg.includes('row-level security') || lowerMsg.includes('policy')) {
    return "이 작업을 수행할 권한이 없습니다.";
  }
  
  // 네트워크 오류
  if (lowerMsg.includes('failed to fetch') || lowerMsg.includes('network')) {
    return "인터넷 연결을 확인해주세요.";
  }
  
  // Not Found
  if (code === 'PGRST116' || lowerMsg.includes('not found') || lowerMsg.includes('no rows')) {
    return "요청한 게시글을 찾을 수 없습니다.";
  }

  // 인증 관련 (추가적인 흔한 에러 대비)
  if (lowerMsg.includes('invalid login credentials')) {
    return "이메일 또는 비밀번호가 일치하지 않습니다.";
  }

  return "일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
}
