// saving catid and acqsource cookies for cms site
// author: Daniel Adams
// Date: 01/25/2013
        SetQueryStringCookies();

        function SetQueryStringCookies() {
            // acqsource cookie
            var queryString = location.search.substring(1);
            var domainString = GetCurrentDomain();
            var acqsourceVal = getCookieValue('acqsource');
            if (acqsourceVal == "") {
                set_session_cookie('acqsource', queryString, domainString);
            }
            else {
                var tpVal = GetQueryVariable(queryString, 'tp');
                if (tpVal != "") {
                    acqSourceVal = UpdateACQValue(acqsourceVal, 'tp', tpVal);
                    set_session_cookie('acqsource', acqSourceVal, domainString);
                }
            }
            // catid cookie
            var catidQS = GetQueryVariable(queryString, 'catid');
            if (catidQS != "") {
                set_session_cookie('catid', catidQS, GetCurrentDomain());
            }
        }

        function GetCurrentDomain() {
            var domainSplit = document.domain.split('.');
            if (domainSplit == null || domainSplit.length < 2) {
                return document.domain;
            }
            if (domainSplit.length == 2) {
                return '.' + domainSplit[0] + '.' + domainSplit[1];
            }
            if (domainSplit.length > 2) {
                return '.' + domainSplit[domainSplit.length - 2] + '.' + domainSplit[domainSplit.length - 1];
            }
            return "";
        }

        function set_session_cookie(name, value, domain) {
            var cookie_string = name + "=" + value;

            cookie_string += "; path=/";
            if (domain)
                cookie_string += "; domain=" + escape(domain);

            document.cookie = cookie_string;
        }

        function getCookieValue(key) {
            currentcookie = document.cookie;
            if (currentcookie.length > 0) {
                firstidx = currentcookie.indexOf(key + "=");
                if (firstidx != -1) {
                    firstidx = firstidx + key.length + 1;
                    lastidx = currentcookie.indexOf(";", firstidx);
                    if (lastidx == -1) {
                        lastidx = currentcookie.length;
                    }
                    return unescape(currentcookie.substring(firstidx, lastidx));
                }
            }
            return "";
        }

        function GetQueryVariable(query, name) {
            if (query.indexOf("?") == 0) { query = query.substr(1); }
            var pairs = query.split("&");
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                if (pair[0] == name) {
                    return pair[1];
                }
            }
            return "";
        }

        function UpdateACQValue(query, key, value) {
            var foundPair;
            if (query.indexOf("?") == 0) { query = query.substr(1); }
            var pairs = query.split("&");
            for (var i = 0; i < pairs.length; i++) {
                var pair = pairs[i].split("=");
                if (pair[0] == key) {
                    foundPair = pair;
                }
            }
            if (foundPair != null) {
                query = '';
                foundPair[1] = value;
                for (var i = 0; i < pairs.length; i++) {
                    var pair = pairs[i].split("=");
                    if (pair[0] == key) {
                        if (query.length > 0) {
                            query += '&' + foundPair[0] + '=' + foundPair[1];
                        }
                        else {
                            query = foundPair[0] + '=' + foundPair[1];
                        }
                    }
                    else {
                        if (query.length > 0) {
                            query += '&' + pairs[i];
                        }
                        else {
                            query = pairs[i];
                        }
                    }
                }
            }
            else {
                if (query.length > 0) {
                    query += '&' + key + '=' + value;
                }
                else {
                    query = key + '=' + value;
                }
            }
            return query
        }