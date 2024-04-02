"use client";
import { useState, useEffect } from "react";
import { fetch } from "./httpUtil";

export const useModalHook = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  return [modalVisible, showModal, hideModal];
};

export const usePublicMasterData = (masterType) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [payload, setPayload] = useState();

  useEffect(() => {
    if (masterType) {
      const fetchApi = async () => {
        setLoading(true);
        try {
          let res = await fetch(`config/v1/masters/public/${masterType}`);
          if (res.data.success) {
            setSuccess(true);
            setPayload(res.data.data);
            setLoading(false);
          } else {
            setSuccess(false);
            setLoading(false);
            setError({});
            setPayload();
          }
        } catch (error) {
          setSuccess(false);
          setLoading(false);
          setError(error);
        }
      };
      fetchApi();
    }
  }, [masterType]);

  return { payload, loading, success, error };
};
