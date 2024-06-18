const Group = require('../models/group');
const GroupMember = require('../models/groupMember');
const User = require('../models/user');

// Create a new group
exports.createGroup = async (req, res) => {
  const { name, createdBy } = req.body;
  try {
    const group = await Group.create({ name, createdBy });
    await GroupMember.create({ groupId: group.id, userId: createdBy }); // Add the creator to the group
    res.status(201).json(group);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to create group' });
  }
};

// Add a user to a group
exports.addUserToGroup = async (req, res) => {
    const { groupId, userId } = req.body;
    if (!groupId || !userId) {
      return res.status(400).json({ error: 'groupId and userId are required' });
    }
  
    try {
      const groupMember = await GroupMember.create({ groupId, userId });
      res.status(201).json(groupMember);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add user to group' });
    }
  };

// Get all users in a group
exports.getUsersInGroup = async (req, res) => {
    const { groupId } = req.params;
    try {
      const groupMembers = await GroupMember.findAll({
        where: { groupId },
        include: [{ model: User, attributes: ['id', 'name', 'email'] }]
      });
      // Extract user information from group members
      const users = groupMembers.map(member => member.User);
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to fetch users in group' });
    }
  };
  

exports.getUserGroups = async (req, res) => {
    const { userId } = req.params;

    try {
        const userGroups = await Group.findAll({
            include: {
                model: GroupMember,
                where: { userId }
            }
        });

        res.status(200).json(userGroups);
    } catch (error) {
        console.error('Error fetching user groups:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
