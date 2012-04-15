function site_assert(condition, msg)
{
if (!condition)
{
alert("Assert failed: "+msg);
throw new Error("Assert failed: "+msg);
}
}
function site_error(msg)
{
alert(msg + "\n\nIf this problem persists, please contact customer support at 1-800-710-1998.");
}