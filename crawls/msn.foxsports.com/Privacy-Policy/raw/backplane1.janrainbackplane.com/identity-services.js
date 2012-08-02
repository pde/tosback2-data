/*
 * Copyright 2011 Janrain, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

Backplane.identityServices = {};

Backplane.identityServices.init = function(messages) {

    var replayObjects = {};
    for (var i = 0; i < messages.length; i++) {
        if (messages[i].message.sticky && messages[i].message.sticky == true) {
            if (typeof messages[i].message.payload.identities == "undefined") {
                console.info("not an identity message");
                continue;
            }
            var id = messages[i].message.payload.identities.entry.id;
            if (messages[i].message.type == 'identity/logout') {
                delete replayObjects["identity/login" + id];
            } else {
                replayObjects[messages[i].message.type + id] = messages[i];
            }
        }
    }
    var replay = [];
    for (var j in replayObjects) {
        replay.push(replayObjects[j]);
    }
    return replay;
}