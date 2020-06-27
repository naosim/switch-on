/**
 * urlのqueryから値を取得する。ない場合はnullを返す
 * @param key 
 */
export function getQuery(key:string): string | null {
  if(location.search.indexOf('?') != 0) {
    return null;
  }
  var kvList = location.search.split('?')[1].split('#')[0].split('&');
  var prefix = key + '=';
  var oneAry = kvList.filter(v => v.indexOf(prefix) == 0);
  if(oneAry.length != 1) {
    return null;
  }
  return decodeURI(oneAry[0].slice(prefix.length));
}