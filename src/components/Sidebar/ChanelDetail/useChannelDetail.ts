import { useState } from "react";
import { useParams } from "react-router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { channelState } from "../../../states/room.state";
import { showChannelFormState } from "../../../states/app.state";
import { connectedUsersState, userState } from "../../../states/user.state";
import { iChannel } from "../../../types/channel.types";
import { iUser } from "../../../types/user.types";

const useChannelDetail = () => {

    const params: any = useParams();
    const { id } = params;

    const [visibleEdit, setVisibleEdit] = useState<boolean>(false);
    const [visibleDropdown, setVisibleDropdown] = useState<boolean>(false);
    const [visibleMembers, setVisibleMembers] = useState<boolean[]>([false, false]);

    const channels = useRecoilValue(channelState);
    const currentUser = useRecoilValue(userState);
    const connectedUsers = useRecoilValue(connectedUsersState);
    const setShowChannelForm = useSetRecoilState(showChannelFormState);
    const currentChannel = channels?.find((e: iChannel) => e._id === id);


    const isCurrentUserOwner =
        currentChannel?.owner?.username === currentUser?.username || false;

    const onlineUsers = connectedUsers?.reduce(
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
    const openEdit = () => setShowChannelForm(true);
    const toggleDropdown = () => {
        setVisibleDropdown(value => !value)
    };
    const hideDropdown = () => setVisibleDropdown(false);

    const toggleVisibleMember = (idx: number) => {
        const newVisibleMembers = [...visibleMembers];
        newVisibleMembers[idx] = !newVisibleMembers[idx];
        setVisibleMembers(newVisibleMembers);
    }

    return {
        visibleEdit,
        visibleMembers,
        onlineMembers,
        currentChannel,
        offlineMembers,
        visibleDropdown,
        isCurrentUserOwner,
        closeEdit,
        openEdit,
        hideDropdown,
        toggleDropdown,
        toggleVisibleMember,
    }


}

export { useChannelDetail };