const getDate = () => {
  const date = new Date();

  return [date.getHours(), date.getMinutes()]
    .map((item) => (item < 10 ? item + "0" : item))
    .join(":");
};

const scrollTopHandle = () => {
  const chatWindow = document.querySelector("#chatWindow");
  chatWindow.scrollTop = chatWindow.scrollHeight - chatWindow.clientHeight;
};

const getUid = (e, openDialog) => {
  openDialog(e.target.closest(".user-online").getAttribute("data-uid"));

  const usersOnline = e.target.closest("ul").querySelectorAll(".user-online");
  usersOnline.forEach((item) => item.classList.remove("active"));
  e.target.closest(".user-online").classList.add("active");
};

const filterOnlineCount = (onlineCount, searchName, userProfile, filter) => {
  let onlineCountFiltered;
  if (filter) {
    onlineCountFiltered = onlineCount.filter(
      (item) => item["uid"] != userProfile["uid"]
    );
    return onlineCountFiltered.filter((item) =>
      item["displayName"].includes(searchName)
    );
  } else return onlineCount;
};
export { getDate, scrollTopHandle, getUid, filterOnlineCount };
