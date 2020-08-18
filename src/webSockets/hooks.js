/*
 * Copyright (C) 2019 CZ.NIC z.s.p.o. (http://www.nic.cz/)
 *
 * This is free software, licensed under the GNU General Public License v3.
 * See /LICENSE for more information.
 */

import { useEffect, useState } from "react";

export function useWSForisModule(
    ws,
    module,
    action = "update_settings",
    controllerID
) {
    const [data, setData] = useState(null);

    useEffect(() => {
        // Sometimes we want to disable this hook if WS is not passed. We can't make conditional
        // hooks, but we can disable it here. It's used especially in ForisForm when a module
        // doesn't present any WS endpoint.
        if (!ws) return;

        function callback(message) {
            // Accept only messages addressed to device with passed controller ID.
            if (
                controllerID !== undefined &&
                controllerID !== message.controller_id
            ) {
                return;
            }
            setData(message.data);
        }

        ws.subscribe(module).bind(module, action, callback);

        return () => {
            ws.unbind(module, action, callback);
        };
    }, [action, module, ws, controllerID]);

    return [data];
}
