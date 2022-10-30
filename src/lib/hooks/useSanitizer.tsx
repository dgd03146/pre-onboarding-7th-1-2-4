import dompurify from "dompurify";

function useSanitizer(html: string) {
  const sanitizer = dompurify.sanitize;
  const markdown = sanitizer(html);
  return { markdown };
}

export default useSanitizer;
