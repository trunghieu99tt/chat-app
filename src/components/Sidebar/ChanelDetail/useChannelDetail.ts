import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue } from "recoil";
import { channelState } from "../../../states/room.state";
import { connectedUsersState, userState } from "../../../states/user.state";
import { iChannel } from "../../../types/channel.types";
import { iUser } from "../../../types/user.types";

const useChannelDetail = () => {
    const params: any = useParams();
    const { id } = params;

    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);

    const channels = useRecoilValue(channelState);
    const currentUser = useRecoilValue(userState);
    const currentChannel = channels?.find((e: iChannel) => e._id === id);

    const isCurrentUserOwner =
        currentChannel?.owner.username === currentUser?.username || false;

    const onlineUsers = useRecoilValue(connectedUsersState)?.reduce(
        (res: any, user: iUser) => {
            if (user._id) {
                return {
                    ...res,
                    [user._id]: user,
                };
            }
            return {
                ...res,
            };
        },
        {}
    );

    let onlineMembers: iUser[] = [];
    let offlineMembers: iUser[] = [];

    const members = currentChannel?.members || [];

    members.forEach((member: iUser) => {
        if (onlineUsers.hasOwnProperty(member._id)) {
            onlineMembers.push(member);
        } else {
            offlineMembers.push(member);
        }
    });

    const closeEdit = () => setVisibleEdit(false);
    const openEdit = () => setVisibleEdit(true);


    return {
        visibleEdit,
        currentChannel,
        onlineMembers,
        offlineMembers,
        isCurrentUserOwner,
        closeEdit,
        openEdit,
    }


}

export { useChannelDetail };