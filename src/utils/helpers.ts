/**
 * 일정을 .ics 파일로 생성 및 다운로드하여 캘린더에 저장할 수 있도록 함
 */
export const saveToCalendar = (title: string, dateStr: string, description: string) => {
  // 간단한 날짜 파싱 (YYYY.MM.DD 형식 가정)
  const dateParts = dateStr.match(/\d+/g);
  let startDate = new Date();
  if (dateParts && dateParts.length >= 3) {
    startDate = new Date(parseInt(dateParts[0]), parseInt(dateParts[1]) - 1, parseInt(dateParts[2]));
  }
  
  const endDate = new Date(startDate.getTime() + 60 * 60 * 1000); // 1시간 뒤
  
  const formatICSDate = (date: Date) => {
    return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const icsContent = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PROID:-//Senior Welfare//NONSGML v1.0//EN",
    "BEGIN:VEVENT",
    `DTSTART:${formatICSDate(startDate)}`,
    `DTEND:${formatICSDate(endDate)}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${description}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", `${title.replace(/\s+/g, "_")}.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};

/**
 * 공유 텍스트 대지(Clipboard) 복사 또는 공유 API 호출
 */
export const handleShare = async (title: string, text: string, url: string, onSuccess: (msg: string) => void) => {
  const shareData = { title, text, url };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.error("공유 취소 또는 실패:", err);
    }
  } else {
    const textToCopy = `${title}\n\n${text}\n\n${url}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(textToCopy);
        onSuccess("공유 링크가 복사되었습니다.");
      } catch (err) {
        onSuccess("복사에 실패했습니다.");
      }
    } else {
      // Fallback for non-https or older browsers
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        textArea.remove();
        onSuccess("공유 링크가 클립보드에 복사되었습니다.");
      } catch (err) {
        onSuccess("안전한 연결(HTTPS) 환경에서만 공유가 지원됩니다.");
      }
    }
  }
};
