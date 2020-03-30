import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanSessionController {
  async store(req, res) {
    const schema = Yup.object({
      id: Yup.number()
        .positive()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const deliveryman = await Deliveryman.findByPk(req.body.id, {
      attributes: { exclude: ['updatedAt', 'avatar_id'] },
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'name', 'path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.status(401).json({ error: 'Delivery man not found' });
    }

    return res.json(deliveryman);
  }
}

export default new DeliverymanSessionController();
