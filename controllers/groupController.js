const Group = require('../models/group');
const GroupMembership = require('../models/groupMember');
const Groupchat = require('../models/group-chat');

exports.createGroup = async (req, res) => {
  const { name, creatorId } = req.body;

  try {
    const group = await Group.create({ name, creatorId });
    await GroupMembership.create({ groupId: group.id, userId: creatorId });

    res.status(201).json(group);
  } catch (error) {
    console.error('Error creating group:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.addUserToGroup = async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;
    const parsedGroupId = parseInt(groupId, 10);

    if (isNaN(parsedGroupId)) {
      return res.status(400).json({ error: 'Invalid groupId' });
    }

    await GroupMembership.create({ groupId: parsedGroupId, userId });
    res.status(200).json({ message: 'User added to group successfully' });
  } catch (error) {
    console.error('Error adding user to group:', error);
    res.status(500).json({ error: 'Failed to add user to group' });
  }
};

exports.getUserGroups = async (req, res) => {
  const { userId } = req.params;

  try {
    const groups = await GroupMembership.findAll({
      where: { userId },
      include: { model: Group, as: 'group' }
    });
    res.status(200).json(groups.map(g => g.group));
  } catch (error) {
    console.error('Error fetching user groups:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

exports.getGroupMessages = async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await Groupchat.findAll({ where: { groupId } });
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching group messages:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
